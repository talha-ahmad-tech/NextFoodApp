import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  kits: Array<object>;
}

const initialState: IState = {
  kits: [],
};

const taxSlice = createSlice({
  name: "tax",
  initialState,
  reducers: {
    setKits: (state: IState, action) => {
      state.kits = [...state.kits ,action.payload]
    },
  },
});

export const { setKits } = taxSlice.actions;
export const taxReducer = taxSlice.reducer;
