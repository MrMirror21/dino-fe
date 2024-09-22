import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export interface ServerResponse<T = any> {
  isSuccess: boolean;
  code: string;
  message: string;
  createdAt: string;
  data: T;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions<TData = any, TVariables = any>
  extends Omit<AxiosRequestConfig, 'url' | 'method'> {
  method?: HttpMethod;
  queryOptions?: UseQueryOptions<ServerResponse<TData>, AxiosError>;
  mutationOptions?: UseMutationOptions<
    ServerResponse<TData>,
    AxiosError,
    TVariables
  >;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const request = async <TData = any, TVariables = any>(
  path: string,
  {
    method = 'GET',
    data,
    params,
    headers,
    ...config
  }: RequestOptions<TData, TVariables> = {},
): Promise<ServerResponse<TData>> => {
  try {
    const response = await api.request<ServerResponse<TData>>({
      url: path,
      method,
      data,
      params,
      headers,
      ...config,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Request failed: ${error.response?.data?.message || error.message}`,
      );
    }
    throw error;
  }
};

export function useRequest<TData = any>(
  path: string,
  options: RequestOptions<TData> & { method: 'GET' },
): UseQueryResult<ServerResponse<TData>, AxiosError>;

export function useRequest<TData = any, TVariables = any>(
  path: string,
  options: RequestOptions<TData, TVariables> & {
    method: Exclude<HttpMethod, 'GET'>;
  },
): UseMutationResult<ServerResponse<TData>, AxiosError, TVariables>;

export function useRequest<TData = any, TVariables = any>(
  path: string,
  options: RequestOptions<TData, TVariables> = {},
) {
  const {
    method = 'GET',
    queryOptions,
    mutationOptions,
    ...axiosOptions
  } = options;

  if (method === 'GET') {
    return useQuery<ServerResponse<TData>, AxiosError>({
      queryKey: [path, axiosOptions.params],
      queryFn: () => request<TData>(path, { method, ...axiosOptions }),
      ...queryOptions,
    });
  } else {
    return useMutation<ServerResponse<TData>, AxiosError, TVariables>({
      mutationFn: (variables) =>
        request<TData, TVariables>(path, {
          method,
          ...axiosOptions,
          data: variables,
        }),
      ...mutationOptions,
    });
  }
}
