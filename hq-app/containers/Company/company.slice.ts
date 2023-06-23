import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { COMPANY_DETAILS } from './types';

export interface IState {
  company: Array<object>;
}

const initialState: IState = {
  company: [],
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state: IState, action: PayloadAction<COMPANY_DETAILS>) => {
      state.company = [...state.company ,action.payload]
    },
  },
});

export const { setCompany } = companySlice.actions;
export const companyReducer = companySlice.reducer;
