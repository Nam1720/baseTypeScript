import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

import { APP_CONFIG } from 'utils/env';

import { notification } from 'antd';

import { getAccessToken, destroyLogged, saveAuth } from 'utils/jwt';

import { history } from 'routes/history';

import { KEY_API_FAIL } from './common/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: APP_CONFIG.apiUrl,
  prepareHeaders: (headers, {}) => {
    const token = getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithIntercept: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result: QueryReturnValue<any, FetchBaseQueryError, FetchBaseQueryMeta> = await baseQuery(
    args,
    api,
    extraOptions,
  );
  // console.log(result, ' Interceptor ');
  const { data, error, meta } = result;
  //  If you encounter a mistake
  if (error) {
    const { status, originalStatus } = error as FetchBaseQueryError;
    const { request } = meta as FetchBaseQueryMeta;
    const url: string = request.url;
    // console.log('AAAA', error as FetchBaseQueryError);
    //  Handle errors based on Status
    printHttpError(Number(status === 'PARSING_ERROR' ? originalStatus : status), url);
    return;
    // TODO  Handle the error message and prompt the front end
  }
  if (result?.data?.status && result.data.status === KEY_API_FAIL) {
    printHttpError(Number(result.data.code), result.data.message[0]);
    return;
  }
  // console.log(data.data, ' Interceptor 2');
  return result.data;
  // if (result?.data?.data) {
  //   return result.data.data;
  // }
  // throw new Error(data.message);
};

export const printHttpError = (httpStatus: number, path: string): void => {
  console.log('Status: ', httpStatus);
  switch (httpStatus) {
    case 400:
      notification['error']({
        message: 'Có lỗi xảy ra',
        description: `Wrong request :${path}`,
      });
      break;
    // 401:  Not logged in
    //  If you don't log in, go to the login page , And take the path of the current page
    case 401:
      destroyLogged();
      saveAuth(null);
      history.push('/login');
      break;
    //  Jump to the login page
    case 403:
      console.log('Sorry');
      //  Clear all cached data
      history.push('/');
      break;
    // 404 The request does not exist
    case 404:
      notification['error']({
        message: 'Có lỗi xảy ra',
        description: `The network request does not exist`,
      });
      break;
    //  Other mistakes , Throw the error prompt directly
    default:
      notification['error']({
        message: 'Có lỗi xảy ra',
        description: `I dont know what the mistake is`,
      });
      break;
  }
};

export const fetchWithIntercept: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result: QueryReturnValue<any, FetchBaseQueryError, FetchBaseQueryMeta> = await baseQuery(
    args,
    api,
    extraOptions,
  );
  // console.log(result, ' Interceptor ');
  const { data, error, meta } = result;
  const { request } = meta as FetchBaseQueryMeta;
  const url: string = request.url;
  //  If you encounter httpStatus!=200-300 Wrong time
  if (error) {
    const { status } = error as FetchBaseQueryError;
    //  Handle errors based on Status
    printHttpError(Number(status), url);
  }
  //  At the right time , Written according to their respective back-end conventions
  if (Object.is(data?.code, 0)) {
    return result;
  } else {
    // TODO  Print prompt
    // printPanel({ method: request.method, url: request.url });
    // TODO  According to the error prompt returned by the back-end, send it to the component , You can also pop up the prompt here directly
    return Promise.reject(' error message ');
  }
};

export const apiStore = createApi({
  baseQuery: baseQueryWithIntercept,
  reducerPath: 'apiStore',
  tagTypes: ['district'],
  //  cache , The default time is seconds , Default duration 60 second
  keepUnusedDataFor: 3 * 60,
  refetchOnMountOrArgChange: 30 * 60,
  endpoints: () => ({}),
});
