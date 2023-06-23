import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  kits: Array<object>;
}

const initialState: IState = {
  kits: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setKits: (state: IState, action: any) => {
      state.kits = [...state.kits ,action.payload]
    },
  },
});

export const { setKits } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
