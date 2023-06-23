import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  modifierList: Array<object>;
}

const initialState: IState = {
  modifierList: [],
};

const modifiersSlice = createSlice({
  name: "modifiers",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setModifier: (state: IState, action: any) => {
      state.modifierList = [...state.modifierList ,action.payload]
    },
  },
});

export const { setModifier } = modifiersSlice.actions;
export const modifiersReducer = modifiersSlice.reducer;
