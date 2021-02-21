import {responseInterface} from 'swr';
import { AxiosError, AxiosResponse } from 'axios';

export interface Return<Data>
  extends Pick<
    responseInterface<AxiosResponse<IApiResponseData<Data>>, AxiosError<IApiResponseData>>,
    'isValidating' | 'revalidate' | 'mutate'
    > {
  data: Data | undefined
  response: AxiosResponse<IApiResponseData<Data>> | undefined
}

export interface IApiResponseData<Data = null> {
  statusCode: number;
  timestamp: number;
  path: string;
  message?: string
  data: Data;
}
