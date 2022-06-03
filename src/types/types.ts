import { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent } from 'react';
export type RateItemType = { name: string; rate: number };
export type RatesType = { [key: string]: number };
export type LatestRespType = { date: string; rates: RatesType };

export interface ExchangerState {
  rates: RateItemType[];
  result: string;
  loading: boolean;
  hasError: boolean;
  amount: string;
  currency: string;
}

export type ApiError = {
  message?: string;
  name?: string;
  code?: string;
};

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
};

export type RateTableProps = {
  items?: RateItemType[];
  setCurrencyTo(name: string): void;
};

export type TCurrencyChanger = {
  id: string;
  inputLabel?: string;
  selectLabel?: string;
  currencyList?: string[];
  inputValue: string;
  selectValue: string;
  selectHandler: (e: SelectChangeEvent) => void;
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};
