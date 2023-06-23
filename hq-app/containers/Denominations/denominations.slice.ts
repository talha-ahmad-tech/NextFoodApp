import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  denominations: Array<object>;
}

const initialState: IState = {
  denominations: [],
};

const denominationsSlice = createSlice({
  name: 'denominations',
  initialState,
  reducers: {
    setdenominations: (state: IState, action: any) => {
      state.denominations = [...state.denominations, action.payload];
    },
  },
});

export const { setdenominations } = denominationsSlice.actions;
export const denominationsReducer = denominationsSlice.reducer;
