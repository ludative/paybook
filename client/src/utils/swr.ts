import useSWR, { ConfigInterface } from 'swr';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { IApiResponseData, Return } from '../interfaces/common';

export type GetRequest = AxiosRequestConfig | null;

export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  config: ConfigInterface = {},
): Return<Data, Error> {
  const {
    data: response,
    isValidating,
    revalidate,
    mutate,
  } = useSWR<AxiosResponse<IApiResponseData<Data>>,
    AxiosError<IApiResponseData<Error>>>(
    request && JSON.stringify(request),
    () => axios(request!),
    {
      revalidateOnFocus: false,
      errorRetryCount: 0,
      onError: (err: AxiosError<IApiResponseData<Error>>):void => {
        alert(err.response?.data.message)
      },
      ...config,
    },
  );

  return {
    data: response && response?.data?.data,
    response,
    isValidating,
    revalidate,
    mutate,
  };
}