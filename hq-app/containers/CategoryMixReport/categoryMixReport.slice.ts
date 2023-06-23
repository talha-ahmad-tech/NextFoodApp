import { createSlice } from '@reduxjs/toolkit';
export interface IState {
  categoryMixReport: Array<object>;
}

const initialState: IState = {
  categoryMixReport: [],
};

const categoryMixReportSlice = createSlice({
  name: 'categoryMixReport',
  initialState,
  reducers: {
    setcategoryMixReport: (state: IState, action) => {
      state.categoryMixReport = [...state.categoryMixReport, action.payload];
    },
  },
});

export const { setcategoryMixReport } = categoryMixReportSlice.actions;
export const categoryMixReportReducer = categoryMixReportSlice.reducer;
