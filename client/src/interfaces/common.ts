import {responseInterface} from 'swr';
import { AxiosError, AxiosResponse } from 'axios';

export interface Return<Data, Error>
  extends Pick<
    responseInterface<AxiosResponse<IApiResponseData<Data>>, AxiosError<Error>>,
    'isValidating' | 'revalidate' | 'mutate'
    > {
  data: Data | undefined
  response: AxiosResponse<IApiResponseData<Data>> | undefined
}

export interface IApiResponseData<Data = null> {
  status: number;
  timestamp: number;
  path: string;
  message?: string
  data: Data;
}
