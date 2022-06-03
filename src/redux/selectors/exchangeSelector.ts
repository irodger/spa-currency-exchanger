import { ExchangerState } from '../slices/exchangerSlice';

export const ratesSelector = ({ exchanger }: { exchanger: ExchangerState }) => exchanger.rates;
export const resultSelector = ({ exchanger }: { exchanger: ExchangerState }) => exchanger.result;
export const amountSelector = ({ exchanger }: { exchanger: ExchangerState }) => exchanger.amount;
export const currencySelector = ({ exchanger }: { exchanger: ExchangerState }) => exchanger.currency;
