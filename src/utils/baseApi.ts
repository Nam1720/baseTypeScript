import HttpService from './http';

export class BaseApi {
  protected model = '';

  constructor(modelName: string) {
    this.model = modelName;
  }

  getAll(): Promise<any> {
    const endpoint = `${this.model}/list`;
    return HttpService.get(endpoint);
  }

  getByParams(params: any): Promise<any> {
    const endpoint = `${this.model}/list`;
    return HttpService.get(endpoint, params);
  }

  getFilterSelect(params: any): Promise<any> {
    // const endpoint = `${this.model}s/filter`;
    const endpoint = `${this.model}`;
    return HttpService.get(endpoint, params);
  }

  getDetail(id: number): Promise<any> {
    const endpoint = `${this.model}/${id}`;
    return HttpService.get(endpoint);
  }

  update(payload: any, id: number): Promise<any> {
    const endpoint = `${this.model}/${id}/update`;
    return HttpService.put(endpoint, payload);
  }

  create(payload: any): Promise<any> {
    const endpoint = `${this.model}/store`;
    return HttpService.post(endpoint, payload);
  }

  delete(id: number) {
    const endpoint = `${this.model}/${id}/destroy`;
    return HttpService.delete(endpoint);
  }

  deleteMulti(ids: number[]): Promise<any> {
    const endpoint = `${this.model}`;
    return HttpService.deleteMulti(endpoint, ids);
  }

  upload(evtFile: any): Promise<any> | undefined {
    if (!evtFile?.target?.files) {
      return;
    }
    const files = [...evtFile.target.files];
    const formData = new FormData();
    files.map((file: any) => {
      formData.append('file[]', file);
    });
    const endpoint = 'upload';
    return HttpService.uploadFile(endpoint, formData, evtFile.optionUpload);
  }
}
