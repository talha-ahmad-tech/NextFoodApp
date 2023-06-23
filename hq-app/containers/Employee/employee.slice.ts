import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  employees: Array<object>;
}

const initialState: IState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees: (state: IState, action) => {
      state.employees = [...state.employees, action.payload];
    },
  },
});

export const { setEmployees } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
