import { FetchDropDownOptions } from "./sharedRedux/actions";

export const getDropDownData = (dispatch: any, options?: any) => {
  return new Promise((resolve: any, reject: any) => {
    dispatch(
      FetchDropDownOptions(options, (data: any) => {
        resolve(data);
      })
    );
  });
};
