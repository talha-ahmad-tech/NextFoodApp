import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  kits: Array<object>;
}

const initialState: IState = {
  kits: [],
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setKits: (state: IState, action: any) => {
      state.kits = [...state.kits ,action.payload]
    },
  },
});

export const { setKits } = customersSlice.actions;
export const customersReducer = customersSlice.reducer;
