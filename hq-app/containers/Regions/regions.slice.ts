import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  regions: Array<object>;
}

const initialState: IState = {
  regions: [],
};

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    setregions: (state: IState, action: any) => {
      state.regions = [...state.regions, action.payload];
    },
  },
});

export const { setregions } = regionsSlice.actions;
export const regionsReducer = regionsSlice.reducer;
