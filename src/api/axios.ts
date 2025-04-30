import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResponseDefaultType } from '@/types/responseType';
import CustomError from '@/utils/CustomError';
import { tokenManager } from '@/utils/tokenManager';

const apiClient = (() =>
  axios.create({
    baseURL: import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }))();

apiClient.interceptors.request.use(config => {
  const token = tokenManager.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

export const fetchData = async <RequestType = undefined, ResponseDataType = undefined, ErrorType = unknown>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: RequestType,
  config?: AxiosRequestConfig,
): Promise<ResponseDefaultType<ResponseDataType>> => {
  try {
    let response: AxiosResponse<ResponseDefaultType<ResponseDataType>>;

    switch (method) {
      case 'GET':
        response = await apiClient.get(endpoint, config);
        break;
      case 'POST':
        response = await apiClient.post(endpoint, data, config);
        break;
      case 'PUT':
        response = await apiClient.put(endpoint, data, config);
        break;
      case 'DELETE':
        response = await apiClient.delete(endpoint);
        break;
      default:
        throw new Error('Invalid HTTP method');
    }
    return response.data;
  } catch (error: any) {
    throw new CustomError<ErrorType>(
      error.response?.data?.message || error.message || 'An unknown error occurred',
      error.response?.data.data,
    );
  }
};
