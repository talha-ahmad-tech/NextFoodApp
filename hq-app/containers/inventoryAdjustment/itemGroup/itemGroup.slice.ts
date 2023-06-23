import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { ITEM_GROUP_DETAILS } from './types';

export interface IState {
  kits: Array<object>;
}

const initialState: IState = {
  kits: [],
};

const itemGroupSlice = createSlice({
  name: "itemGroup",
  initialState,
  reducers: {
    setKits: (state: IState, action: PayloadAction<ITEM_GROUP_DETAILS>) => {
      state.kits = [...state.kits ,action.payload]
    },
  },
});

export const { setKits } = itemGroupSlice.actions;
export const itemGroupReducer = itemGroupSlice.reducer;
