import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { IApiResponseData } from '../interfaces/common';
import { IAxios } from '../interfaces/IAxios';

class Axios<Payload = null, Data = null> implements IAxios<Payload, Data> {
  service: AxiosInstance;

  constructor() {
    let service = axios.create({
      responseType: 'json',
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response: AxiosResponse<IApiResponseData<Data>>): AxiosResponse<Data>{
    return { ...response, data: response.data?.data };
  }

  handleError(error: AxiosError<IApiResponseData>): Promise<AxiosError<IApiResponseData>> {
    switch (error.response?.status) {
      case 401:
        window.location.replace('/sign-in');
        break;
      case 403:
        window.location.replace('/');
        break;
      case 404:
        window.location.replace('/404');
        break;
      default:
        break;
    }
    return Promise.reject(error);
  };

  put(path: string, payload: Payload){
    return this.service.request({
      method: 'PUT',
      url: path,
      data: payload,
    });
  }

  post(path: string, payload: Payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      data: payload,
    });
  }

  delete(path: string, payload: Payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      data: payload,
    });
  }
}

export default Axios;