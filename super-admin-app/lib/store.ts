//Please don't remove any comment from this file.

import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

//addReducersImportsHere
import { companyReducer } from 'containers/Company/company.slice';
import { companyApi } from 'services/modules/company.api';

import { localstorageService } from '@fridayfood/shared/utils';
import { toast } from 'react-toastify';

// import { MiddlewareNotFoundError } from 'next/dist/shared/lib/utils';

export const ErrorLoggerMiddleware: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    const { data } = action?.payload ?? { data: { message: '' } };
    if (data?.statusCode === 401) {
      localstorageService.logout();
    }
    toast.error(data?.message);
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    //addReducersHere
    companyReducer,
    [companyApi.reducerPath]: companyApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      //addMiddlewareHere
      companyApi.middleware,
      ErrorLoggerMiddleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
