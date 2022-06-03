import API from './api';
import { AxiosError, AxiosResponse } from 'axios';

export type ApiError = {
  message?: string;
  name?: string;
  code?: string;
};

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
};

export const createResponse = <T>(response: AxiosResponse<T> | { error: AxiosError }): ApiResponse<T> => {
  if ('data' in response) {
    return response.data;
  }

  return response;
};

const methods: Record<string, string> = {
  all: '/latest.js',
};

export const getAllCurrency = () =>
  API.get(methods.all)
    .then(createResponse)
    .catch((error) => console.warn(error));
