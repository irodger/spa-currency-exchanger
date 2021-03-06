import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCurrency } from '../../utils/requests';
import { RatesType, LatestRespType, ExchangerState } from '../../types/types';

import { convertRatesObjToArray } from '../../utils/utils';

const initialState = {
  rates: [],
  result: '',
  loading: false,
  hasError: false,
  amount: '100',
  currency: 'USD',
} as ExchangerState;

export const exchangerSlice = createSlice({
  name: 'exchanger',
  initialState,
  reducers: {
    addAmount: (state, action) => {
      state.amount = isNaN(action.payload) ? 0 : action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    calculate: (state) => {
      const currentRate = state.rates?.find((i) => i.name === state.currency)?.rate;

      if (currentRate) {
        const result = (currentRate * Number(state.amount)).toFixed(2);
        state.result = `${result} ${state.currency}`;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCurrencies.pending, (state: ExchangerState) => {
      state.hasError = false;
      state.loading = true;
    });
    builder.addCase(fetchCurrencies.fulfilled, (state: ExchangerState, action) => {
      state.rates = convertRatesObjToArray(action.payload as RatesType);
      state.loading = false;
    });
    builder.addCase(fetchCurrencies.rejected, (state: ExchangerState) => {
      state.loading = false;
      state.hasError = true;
    });
  },
});

export const fetchCurrencies = createAsyncThunk('currencies/fetch', async () => {
  try {
    const response = await getAllCurrency();

    return (response as LatestRespType).rates;
  } catch (err) {
    console.warn(err);
  }
});

export const { addAmount, setCurrency, calculate } = exchangerSlice.actions;

export default exchangerSlice.reducer;
