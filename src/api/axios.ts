import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/api/endpoints';
import { ResponseDefaultType } from '@/types/responseType';

const apiClient = (() =>
  axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }))();

export const fetchData = async <RequestType = undefined>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: RequestType,
  config?: AxiosRequestConfig,
): Promise<ResponseDefaultType> => {
  try {
    let response: AxiosResponse<ResponseDefaultType>;
    switch (method) {
      case 'GET':
        response = await apiClient.get<ResponseDefaultType>(endpoint, config);
        break;
      case 'POST':
        response = await apiClient.post<ResponseDefaultType>(endpoint, data, config);
        break;
      case 'PUT':
        response = await apiClient.put<ResponseDefaultType>(endpoint, data, config);
        break;
      case 'DELETE':
        response = await apiClient.delete<ResponseDefaultType>(endpoint);
        break;
      default:
        throw new Error('Invalid HTTP method');
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'An unknown error occurred');
  }
};
