import { reactive, toRefs, UnwrapRef } from 'vue';
import axios from 'axios';

import {
  RequestState,
  AxiosConfig,
  AxiosResponse,
  AxiosResponseData,
} from 'src/interfaces';

export const useAxios = <T>({
  url,
  method,
  data,
  config,
  apiBaseUrl,
}: AxiosConfig<T>): AxiosResponse<T> => {
  if (!apiBaseUrl) {
    apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
  }
  const fullUrl = `${apiBaseUrl as string}/${url}`;
  const initialState = () => ({
    isError: false,
    data: undefined,
    count: undefined,
  });
  const state = reactive<RequestState<T>>(initialState());
  if (!config?.headers) {
    config = { ...config, headers: { 'Content-type': 'application/json' } };
  }

  const exec = async () => {
    Object.assign(state, initialState());
    try {
      const response = ['post', 'put', 'patch'].includes(method)
        ? await axios[method](fullUrl, data, config)
        : await axios[method](fullUrl, config);
      const responseData = response.data as AxiosResponseData;
      state.data = responseData?.results as UnwrapRef<T>;
      state.count = responseData?.count;
    } catch (error: unknown) {
      state.isError = true;
    }
  };

  return {
    ...toRefs(state),
    exec,
  } as AxiosResponse<T>;
};

export default useAxios;
