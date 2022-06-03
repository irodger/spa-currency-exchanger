import { RateItemType, RatesType, ApiResponse } from '../types/types';
import { AxiosResponse, AxiosError } from 'axios';

export const sortingRates = (arr: RateItemType[], upSort = false): RateItemType[] =>
  arr.sort(({ rate: aRate }, { rate: bRate }) =>
    upSort ? Number(aRate) - Number(bRate) : Number(bRate) - Number(aRate),
  );

export const sortingCurrency = (arr: RateItemType[], upSort = false) =>
  arr.sort(({ name: aName }, { name: bName }) => (upSort ? aName.localeCompare(bName) : bName.localeCompare(aName)));

export const convertRatesObjToArray = (items: RatesType): RateItemType[] =>
  Object.keys(items).map((item) => ({
    name: item,
    rate: items[item],
  }));

export const createResponse = <T>(response: AxiosResponse<T> | { error: AxiosError }): ApiResponse<T> => {
  if ('data' in response) {
    return response.data;
  }

  return response;
};
