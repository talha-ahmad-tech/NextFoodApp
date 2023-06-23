import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
import { PAYMENT_METHOD_DETAILS } from '@/containers/Payment/types';
import { alertService } from '@fridayfood/shared/components';
const ApiPrefix = '/api/app/';
export interface Post {
  body: object;
}

export const PaymentApis = {
  PaymentMethodListing: ({ page, size }: { page: number; size: number }) =>
    ApiPrefix + `payment-method?PageIndex=${page}&PageSize=${size}`,
  PaymentMethodDetails: (id: number) => ApiPrefix + `payment-method/${id}`,
  CreatePaymentMethod: ApiPrefix + 'payment-method',
  UpdatePaymentMethod: ApiPrefix + 'payment-method',
  CreateUpdatePaymentMethod: ApiPrefix + 'payment-method',
  paymentNumberSeries:
    ApiPrefix + 'number-series/number-series-code?Name=paymentMethod',
};

export const paymentApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'payment/api',
  endpoints: build => ({
    fetcthPaymentMethod: build.query({
      query: (config: { page: number; size: number }) => {
        return {
          url: PaymentApis.PaymentMethodListing(config),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    fetcthPaymentMethodById: build.query({
      query: (id: number) => {
        return {
          url: PaymentApis.PaymentMethodDetails(id),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    CreatePaymentMethod: build.mutation<Post, Partial<Post>>({
      query: body => ({
        url: PaymentApis.CreatePaymentMethod,
        method: 'POST',
        body,
      }),
    }),
    UpdatePaymentMethod: build.mutation<Post, Partial<Post>>({
      query: body => ({
        url: PaymentApis.UpdatePaymentMethod,
        method: 'PUT',
        body,
      }),
    }),
    CreateUpdatePaymentMethod: build.mutation({
      query: (body: PAYMENT_METHOD_DETAILS) => ({
        url: PaymentApis.CreateUpdatePaymentMethod,
        method: body.id ? 'PUT' : 'POST',
        body,
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse(baseQueryReturnValue: any) {
        alertService.error(baseQueryReturnValue?.data.error.message, {
          keepAfterRouteChange: true,
          autoClose: true,
        });
      },
    }),
  }),
});

export const {
  useLazyFetcthPaymentMethodQuery,
  useFetcthPaymentMethodQuery,
  useFetcthPaymentMethodByIdQuery,
  useCreatePaymentMethodMutation,
  useUpdatePaymentMethodMutation,
  useCreateUpdatePaymentMethodMutation,
} = paymentApi;
