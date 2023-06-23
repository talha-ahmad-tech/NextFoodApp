import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { NUMBER_SERIES_DETAILS } from './types';

export interface IState {
  numberSeries: Array<object>;
}

const initialState: IState = {
  numberSeries: [],
};

const numberSeriesSlice = createSlice({
  name: "numberSeries",
  initialState,
  reducers: {
    setNumberSeries: (state: IState, action: PayloadAction<NUMBER_SERIES_DETAILS>) => {
      state.numberSeries = [...state.numberSeries ,action.payload]
    },
  },
});

export const { setNumberSeries } = numberSeriesSlice.actions;
export const numberSeriesReducer = numberSeriesSlice.reducer;
