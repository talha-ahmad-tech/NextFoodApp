import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ROLES_DETAILS } from './types';

export interface IState {
  roles: Array<object>;
}

const initialState: IState = {
  roles: [],
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles: (state: IState, action: PayloadAction<ROLES_DETAILS>) => {
      state.roles = [...state.roles ,action.payload]
    },
  },
});

export const { setRoles } = rolesSlice.actions;
export const rolesReducer = rolesSlice.reducer;
