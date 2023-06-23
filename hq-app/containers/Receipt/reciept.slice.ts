import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  reciept: Array<object>;
}

const initialState: IState = {
  reciept: [],
};

const recieptSlice = createSlice({
  name: 'reciept',
  initialState,
  reducers: {
    setreciept: (state: IState, action: any) => {
      state.reciept = [...state.reciept, action.payload];
    },
  },
});

export const { setreciept } = recieptSlice.actions;
export const recieptReducer = recieptSlice.reducer;
