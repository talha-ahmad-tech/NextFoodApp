import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  discount: Array<object>;
}

const initialState: IState = {
  discount: [],
};

const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {
    setDiscount: (state: IState, action: any) => {
      state.discount = [...state.discount, action.payload];
    },
  },
});

export const { setDiscount } = discountSlice.actions;
export const discountReducer = discountSlice.reducer;
