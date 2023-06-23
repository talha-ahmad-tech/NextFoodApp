import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  clusters: Array<object>;
}

const initialState: IState = {
  clusters: [],
};

const clustersSlice = createSlice({
  name: 'clusters',
  initialState,
  reducers: {
    setClusters: (state: IState, action: any) => {
      state.clusters = [...state.clusters, action.payload];
    },
  },
});

export const { setClusters } = clustersSlice.actions;
export const clustersReducer = clustersSlice.reducer;
