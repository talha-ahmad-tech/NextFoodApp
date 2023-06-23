import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  kits: Array<object>;
}

const initialState: IState = {
  kits: [],
};

const onHandInventorySlice = createSlice({
  name: "onHandInventory",
  initialState,
  reducers: {
    setKits: (state: IState, action: any) => {
      state.kits = [...state.kits ,action.payload]
    },
  },
});

export const { setKits } = onHandInventorySlice.actions;
export const onHandInventoryReducer = onHandInventorySlice.reducer;
