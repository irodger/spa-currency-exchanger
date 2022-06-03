import API from './api';
import { createResponse } from '../utils/utils';

const methods: Record<string, string> = {
  all: '/latest.js',
};

export const getAllCurrency = () =>
  API.get(methods.all)
    .then(createResponse)
    .catch((error) => console.warn(error));
