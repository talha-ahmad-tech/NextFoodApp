/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  floors: Array<object>;
}

const initialState: IState = {
  floors: [],
};

const floorSlice = createSlice({
  name: 'floor',
  initialState,
  reducers: {
    setFloor: (state: IState, action: any) => {
      state.floors = [...state.floors, action.payload];
    },
  },
});

export const { setFloor } = floorSlice.actions;
export const floorReducer = floorSlice.reducer;
