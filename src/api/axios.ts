import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/api/endpoints';

const apiClient = (() =>
  axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }))();

export const fetchData = async <ResponseType, RequestType = undefined>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: RequestType,
  config?: AxiosRequestConfig,
): Promise<ResponseType> => {
  try {
    let response: AxiosResponse<ResponseType>;
    switch (method) {
      case 'GET':
        response = await apiClient.get<ResponseType>(endpoint, config);
        break;
      case 'POST':
        response = await apiClient.post<ResponseType>(endpoint, data, config);
        break;
      case 'PUT':
        response = await apiClient.put<ResponseType>(endpoint, data, config);
        break;
      case 'DELETE':
        response = await apiClient.delete<ResponseType>(endpoint);
        break;
      default:
        throw new Error('Invalid HTTP method');
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'An unknown error occurred');
  }
};
