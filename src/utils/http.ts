import * as axios from 'axios';

import { notification } from 'antd';

import { KEY_API_FAIL } from 'store/common/constants';

import { history } from '../routes/history';

import { APP_CONFIG } from './env';
import { getAccessToken, destroyLogged, saveAuth } from './jwt';

interface TypeObjKey {
  [key: string]: any;
}

const DEFAULT_HEADERS: TypeObjKey = { 'Content-Type': 'application/json' };
// axios.defaults.credentials = 'include';

class HttpService {
  constructor() {
    // Set Header Auth for all APi
  }

  configRequest(multipart = false, optionsFile: any = {}) {
    let defaultHeaders = DEFAULT_HEADERS;
    // Set header for file
    if (multipart) {
      defaultHeaders = {};
    }
    // console.log(getAccessToken(), 'token config request');
    if (getAccessToken()) {
      defaultHeaders = {
        Authorization: `Bearer ${getAccessToken()}`,
        Accept: 'application/json',
        Cache: 'no-cache',
        common: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        ...defaultHeaders,
      };
    }
    return {
      headers: defaultHeaders,
      ...optionsFile,
    };
  }

  querySearch(params: TypeObjKey = {}): string {
    return Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  }

  get(apiEndpoint: string, params = {}): Promise<any> {
    if (Object.keys(params).length > 0) {
      apiEndpoint = `${apiEndpoint}?${this.querySearch(params)}`;
    }
    return axios.get(APP_CONFIG.apiUrl + apiEndpoint, this.configRequest()).then(
      (res) => {
        if (res.data && res.data.status === KEY_API_FAIL) {
          this.handleErorr(res.data.errors);
          return;
        }
        // return res.data.data;
        // console.log(res);
        return res.data;
      },
      (err) => {
        this.handleErorr(err.response);
      },
    );
  }

  post(apiEndpoint: string, payload: any): Promise<any> {
    return axios.post(APP_CONFIG.apiUrl + apiEndpoint, payload, this.configRequest()).then(
      (res) => {
        if (res?.data && res.data.status === KEY_API_FAIL) {
          this.handleErorr(res.data.errors);
          return;
        }
        return res.data.data;
      },
      (err) => {
        this.handleErorr(err.response);
      },
    );
  }

  put(apiEndpoint: string, payload: any): Promise<any> {
    return axios.put(APP_CONFIG.apiUrl + apiEndpoint, payload, this.configRequest()).then(
      (res: any) => {
        if (res.data && res.data.status === KEY_API_FAIL) {
          this.handleErorr(res.data.errors);
          return;
        }
        return res.data.data;
      },
      (err: any) => {
        this.handleErorr(err.response);
      },
    );
  }

  delete(apiEndpoint: string): Promise<any> {
    return axios.delete(APP_CONFIG.apiUrl + apiEndpoint, this.configRequest()).then(
      (res: any) => {
        if (res.data && res.data.status === KEY_API_FAIL) {
          this.handleErorr(res.data.errors);
          return;
        }
        return res.data.data;
      },
      (err: any) => {
        this.handleErorr(err.response);
      },
    );
  }

  deleteMulti(apiEndpoint: string, payload: number[]): Promise<any> {
    return axios.delete(APP_CONFIG.apiUrl + apiEndpoint, { data: { ids: payload }, ...this.configRequest() }).then(
      (res: any) => {
        if (res.data && res.data.status === KEY_API_FAIL) {
          this.handleErorr(res.data.errors);
          return;
        }
        return res.data.data;
      },
      (err: any) => {
        this.handleErorr(err.response);
      },
    );
  }

  async uploadFile(apiEndpoint: string, fileData: any, settingOptions: any, isMap = false): Promise<any> {
    // if (!this.errorAuth) {
    if (!fileData) {
      notification['error']({
        message: 'Bạn chưa chọn file để tải lên',
      });
      return;
    }
    let formData = fileData;
    if (isMap) {
      formData = await this.mapFilePayload(fileData);
    }
    if (formData) {
      return axios.post(APP_CONFIG.apiUrl + apiEndpoint, formData, this.configRequest(true, settingOptions)).then(
        (res: any) => {
          if (res.data && res.data.status === KEY_API_FAIL) {
            this.handleErorr(res.data.errors);
            return;
          }
          return res.data.data;
        },
        (err) => {
          this.handleErorr(err.response);
        },
      );
    }
    // } else {
    //   return false;
    // }
  }

  mapFilePayload(data) {
    const formData = new FormData();
    Object.keys(data).map(function (key) {
      formData.append(key, data[key]);
    });
    return formData;
  }

  async handleErorr(err: any) {
    let txtErr = '';
    if (!err) {
      notification['error']({
        message: 'Có lỗi xảy ra',
        description: txtErr,
      });
    }
    switch (err.status) {
      case 401:
        await destroyLogged();
        saveAuth(null);
        history.push('/login');
        break;
      case 403:
        history.push('/');
        break;
      default:
        // console.log('Error has occurred');
        break;
    }

    if (Array.isArray(err) && err.length > 0) {
      err.map((item) => (txtErr += item.message));
    } else {
      txtErr = err.data.message ? err.data.message : 'Error has occurred';
    }

    notification['error']({
      message: 'Có lỗi xảy ra',
      description: txtErr,
    });
  }
}
export default new HttpService();
