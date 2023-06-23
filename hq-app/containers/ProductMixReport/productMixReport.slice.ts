import { createSlice } from '@reduxjs/toolkit';
export interface IState {
  productMixReport: Array<object>;
}

const initialState: IState = {
  productMixReport: [],
};

const productMixReportSlice = createSlice({
  name: 'productMixReport',
  initialState,
  reducers: {
    setproductMixReport: (state: IState, action) => {
      state.productMixReport = [...state.productMixReport, action.payload];
    },
  },
});

export const { setproductMixReport } = productMixReportSlice.actions;
export const productMixReportReducer = productMixReportSlice.reducer;
