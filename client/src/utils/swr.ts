import useSWR, { ConfigInterface } from 'swr';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { IApiResponseData, Return } from '../interfaces/common';

export type GetRequest = AxiosRequestConfig | null;

export default function useRequest<Data = unknown>(
  request: GetRequest,
  config: ConfigInterface = {},
): Return<Data> {
  const {
    data: response,
    isValidating,
    revalidate,
    mutate,
  } = useSWR<AxiosResponse<IApiResponseData<Data>>,
    AxiosError<IApiResponseData>>(
    request && JSON.stringify(request),
    () => axios(request!),
    {
      revalidateOnFocus: false,
      errorRetryCount: 0,
      onError: (err: AxiosError<IApiResponseData>):void => {
        if (err.response?.data.statusCode === 401) {
            window.location.replace('/sign-in')
        } else if (err.response?.data.statusCode === 403) {
            window.location.replace('/')
        } else {
            alert(err.response?.data.message)
        }
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
