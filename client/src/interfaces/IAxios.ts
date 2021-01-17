import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { IApiResponseData } from './common';

export interface IAxios<Payload, Data> {
  readonly service: AxiosInstance;
  handleSuccess: (response: AxiosResponse<IApiResponseData<Data>>) => AxiosResponse<Data>;
  handleError: (response: AxiosError<IApiResponseData>) => Promise<AxiosError<IApiResponseData>>;
  put: (path: string, payload: Payload) => Promise<AxiosResponse<IApiResponseData<Data>>>;
  post: (path: string, payload: Payload) => Promise<AxiosResponse<IApiResponseData<Data>>>;
  delete: (path: string, payload: Payload) => Promise<AxiosResponse<IApiResponseData<Data>>>;
}