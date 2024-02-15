import { Ref } from 'vue';

import { HttpMethod } from 'src/types';

export interface RequestState<T> {
  isError: boolean;
  data?: T;
  count?: number;
}

export interface ServerPaginationConfig {
  page?: number;
  search?: string;
}

export interface HttpConfig {
  headers?: Record<string, string | number | boolean>;
  params?: ServerPaginationConfig;
}

export interface AxiosConfig<T> {
  url: string;
  method: HttpMethod;
  data?: T;
  config?: HttpConfig;
  apiBaseUrl?: string;
}

export interface AxiosResponseData {
  results?: unknown[];
  count?: number;
}

export interface AxiosResponse<T> {
  isError: Ref<boolean>;
  data?: Ref<T>;
  count?: Ref<number>;
  exec: () => Promise<void>;
}
