import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  kitchens: Array<object>;
}

const initialState: IState = {
  kitchens: [],
};

const kitchensSlice = createSlice({
  name: 'kitchens',
  initialState,
  reducers: {
    setkitchens: (state: IState, action) => {
      state.kitchens = [...state.kitchens, action.payload];
    },
  },
});

export const { setkitchens } = kitchensSlice.actions;
export const kitchensReducer = kitchensSlice.reducer;
