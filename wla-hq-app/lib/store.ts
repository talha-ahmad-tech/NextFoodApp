//Please don't remove any comment from this file.

import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

//addReducersImportsHere
import { productsReducer } from 'containers/Products/products.slice';
import { productsApi } from 'services/modules/products.api';
import { customersReducer } from 'containers/Customers/customers.slice';
import { customersApi } from 'services/modules/customers.api';

import { localstorageService } from '@fridayfood/shared/utils';
import { toast } from 'react-toastify';
import { orderHistoryReducer } from '@/containers/OrderHistory/orderHistory.slice';
import { OrderHistoryApi } from 'services/modules/orderhistory.api';
import { discountReducer } from 'containers/DiscountCodes/discount.slice';
import { discountCodeApi } from 'services/modules/discount.api';

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

    productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    customersReducer,
    [customersApi.reducerPath]: customersApi.reducer,
    orderHistoryReducer,
    [OrderHistoryApi.reducerPath]: OrderHistoryApi.reducer,
    discountReducer,
    [discountCodeApi.reducerPath]: discountCodeApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      //addMiddlewareHere

      productsApi.middleware,
      productsApi.middleware,
      customersApi.middleware,
      OrderHistoryApi.middleware,
      discountCodeApi.middleware,
      ErrorLoggerMiddleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
