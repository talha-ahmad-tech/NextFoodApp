import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  stores: Array<object>;
  storesId?: string;
}

const initialState: IState = {
  stores: [],
  storesId: '',
};

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    setStoresId: (state: IState, action) => {
      state.storesId = action.payload;
    },
    setStores: (state: IState, action) => {
      state.stores = [...state.stores, action.payload];
    },
  },
});

export const { setStores, setStoresId } = storesSlice.actions;
export const storesReducer = storesSlice.reducer;
