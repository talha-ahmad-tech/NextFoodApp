//Please don't remove any comment from this file.

import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { ProductApi } from 'services/modules/stores.api';
//addReducersImportsHere

import { recieptReducer } from 'containers/Receipt/reciept.slice';
import { recieptApi } from 'services/modules/reciept.api';

import { foodCostingReducer } from 'containers/foodCosting/foodCosting.slice';
import { foodCostingApi } from 'services/modules/foodCosting.api';

import { suppliersReducer } from 'containers/Suppliers/suppliers.slice';
import { suppliersApi } from 'services/modules/suppliers.api';

import { productMixReportReducer } from '@/containers/ProductMixReport/productMixReport.slice';
import { ProductMixReportApi } from 'services/modules/productMixReport.api';
import { categoryMixReportReducer } from '@/containers/CategoryMixReport/categoryMixReport.slice';
import { CategoryMixReportApi } from 'services/modules/categoryMixReport.api';

import { numberSeriesReducer } from 'containers/NumberSeries/numberSeries.slice';
import { numberSeriesApi } from 'services/modules/numberSeries.api';

import { companyReducer } from 'containers/Company/company.slice';
import { companyApi } from 'services/modules/company.api';
import { inventoryAdjustmentReducer } from '@/containers/inventoryAdjustment/inventoryAdjustment.slice';
import { inventoryAdjustmentApi } from 'services/modules/inventoryAdjustment.api';
import { rolesReducer } from 'containers/Roles/roles.slice';
import { rolesApi } from 'services/modules/roles.api';

import { tableorderingReducer } from 'containers/Tableordering/tableordering.slice';
import { tableorderingApi } from 'services/modules/tableordering.api';
import { uomReducer } from 'containers/Uom/uom.slice';
import { uomApi } from 'services/modules/uom.api';

import { itemGroupApi } from 'services/modules/itemGroup.api';

import { finishedproductReducer } from 'containers/Finishedproduct/finishedproduct.slice';
import { finishedproductApi } from 'services/modules/finishedproduct.api';

import { terminalsReducer } from 'containers/Terminals/terminals.slice';
import { terminalsApi } from 'services/modules/terminals.api';
import { packagingmaterialReducer } from 'containers/Packagingmaterial/packagingmaterial.slice';
import { packagingmaterialApi } from 'services/modules/packagingmaterial.api';

import { ingredientsReducer } from 'containers/Ingredients/ingredients.slice';
import { ingredientsApi } from 'services/modules/ingredients.api';
import { regionsReducer } from 'containers/Regions/regions.slice';
import { regionsApi } from 'services/modules/regions.api';

import { clustersReducer } from '@/containers/Clusters/clusters.slice';
import { clusterApi } from 'services/modules/clusters.api';
import { kitchensReducer } from '@/containers/KitchenPrinter/kitchens.slice';
import { kitchenApi } from 'services/modules/kitchen.api';

import { employeeReducer } from 'containers/Employee/employee.slice';
import { employeeApi } from 'services/modules/employee.api';

import { onHandInventoryReducer } from 'containers/OnHandInventory/onHandInventory.slice';
import { onHandInventoryApi } from 'services/modules/onHandInventory.api';

import { modifiersReducer } from 'containers/Modifiers/modifiers.slice';
import { modifiersApi } from 'services/modules/modifiers.api';

import { categoriesReducer } from 'containers/Categories/categories.slice';
import { categoriesApi } from 'services/modules/categories.api';
import { storesReducer } from 'containers/Stores/stores.slice';

import { productsdealReducer } from 'containers/Productsdeal/productsdeal.slice';
import { productsdealApi } from 'services/modules/productsdeal.api';
import { denominationsReducer } from '@/containers/Denominations/denominations.slice';
import { denominationsApi } from 'services/modules/denominations.api';
import { productsReducer } from 'containers/Products/products.slice';
import { productsApi, filtersApi } from 'services/modules/products.api';
import { customersReducer } from 'containers/Customers/customers.slice';
import {
  customersApi,
  orderBycustomersApi,
} from 'services/modules/customers.api';

import { paymentReducer } from 'containers/Payment/payment.slice';
import { paymentApi } from 'services/modules/payment.api';
import { taxReducer } from 'containers/Tax/tax.slice';
import { taxApi } from 'services/modules/tax.api';
import { pricelistReducer } from 'containers/Pricelist/pricelist.slice';
import { pricelistApi } from 'services/modules/pricelist.api';

import { localstorageService } from '@fridayfood/shared/utils';
import { toast } from 'react-toastify';
import { orderHistoryReducer } from '@/containers/OrderHistory/orderHistory.slice';
import { OrderHistoryApi } from 'services/modules/orderhistory.api';
import { kitApi } from 'services/modules/kit.api';
import { storesApi } from 'services/modules/stores.api';
import { reportsApi } from 'services/modules/reports.api';
import { tenantAPIs } from 'services/modules/tenant.api';
import { floorApi } from 'services/modules/floors.api';
import { floorReducer } from '@/containers/FloorManagement/floors.slice';
import { discountReducer } from 'containers/DiscountCodes/discount.slice';
import { discountCodeApi } from 'services/modules/discount.api';
export const ErrorLoggerMiddleware: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    const { status, error, data } = action?.payload;
    if (status === 401) {
      localstorageService.logout();
      sessionStorage.clear();
      localStorage.clear();
    }
    if (data) {
      toast.error(data?.error?.message);
    } else {
      toast.error(error?.message);
    }
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    //addReducersHere

    recieptReducer,
    [recieptApi.reducerPath]: recieptApi.reducer,

    foodCostingReducer,
    [foodCostingApi.reducerPath]: foodCostingApi.reducer,
    suppliersReducer,
    [suppliersApi.reducerPath]: suppliersApi.reducer,

    productMixReportReducer,
    [ProductMixReportApi.reducerPath]: ProductMixReportApi.reducer,

    categoryMixReportReducer,
    [CategoryMixReportApi.reducerPath]: CategoryMixReportApi.reducer,

    numberSeriesReducer,
    [numberSeriesApi.reducerPath]: numberSeriesApi.reducer,

    companyReducer,
    [companyApi.reducerPath]: companyApi.reducer,
    inventoryAdjustmentReducer,
    [inventoryAdjustmentApi.reducerPath]: inventoryAdjustmentApi.reducer,
    rolesReducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    finishedproductReducer,
    [finishedproductApi.reducerPath]: finishedproductApi.reducer,

    tableorderingReducer,
    [tableorderingApi.reducerPath]: tableorderingApi.reducer,

    [itemGroupApi.reducerPath]: itemGroupApi.reducer,
    denominationsReducer,
    [denominationsApi.reducerPath]: denominationsApi.reducer,
    regionsReducer,
    [regionsApi.reducerPath]: floorApi.reducer,
    floorReducer,
    [floorApi.reducerPath]: floorApi.reducer,
    clustersReducer,
    [clusterApi.reducerPath]: clusterApi.reducer,

    kitchensReducer,
    [kitchenApi.reducerPath]: kitchenApi.reducer,

    uomReducer,
    [uomApi.reducerPath]: uomApi.reducer,

    terminalsReducer,
    [terminalsApi.reducerPath]: terminalsApi.reducer,
    packagingmaterialReducer,
    [packagingmaterialApi.reducerPath]: packagingmaterialApi.reducer,
    ingredientsReducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,

    [regionsApi.reducerPath]: regionsApi.reducer,
    employeeReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    onHandInventoryReducer,
    [onHandInventoryApi.reducerPath]: onHandInventoryApi.reducer,

    modifiersReducer,
    [modifiersApi.reducerPath]: modifiersApi.reducer,

    productsdealReducer,
    [productsdealApi.reducerPath]: productsdealApi.reducer,
    categoriesReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    storesReducer,
    [storesApi.reducerPath]: storesApi.reducer,
    pricelistReducer,
    [pricelistApi.reducerPath]: pricelistApi.reducer,
    [kitApi.reducerPath]: kitApi.reducer,
    productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [filtersApi.reducerPath]: filtersApi.reducer,

    customersReducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [orderBycustomersApi.reducerPath]: orderBycustomersApi.reducer,

    paymentReducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    // pricelistReducer,
    [pricelistApi.reducerPath]: pricelistApi.reducer,
    taxReducer,
    [taxApi.reducerPath]: taxApi.reducer,
    orderHistoryReducer,
    [OrderHistoryApi.reducerPath]: OrderHistoryApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
    [tenantAPIs.reducerPath]: tenantAPIs.reducer,
    discountReducer,
    [discountCodeApi.reducerPath]: discountCodeApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      //addMiddlewareHere

      recieptApi.middleware,

      foodCostingApi.middleware,
      suppliersApi.middleware,
      ProductMixReportApi.middleware,
      CategoryMixReportApi.middleware,
      numberSeriesApi.middleware,

      companyApi.middleware,
      inventoryAdjustmentApi.middleware,
      rolesApi.middleware,

      inventoryAdjustmentApi.middleware,
      denominationsApi.middleware,
      regionsApi.middleware,
      floorApi.middleware,
      clusterApi.middleware,
      kitchenApi.middleware,

      tableorderingApi.middleware,

      itemGroupApi.middleware,
      regionsApi.middleware,
      ProductApi.middleware,
      uomApi.middleware,
      finishedproductApi.middleware,
      terminalsApi.middleware,
      packagingmaterialApi.middleware,
      ingredientsApi.middleware,
      regionsApi.middleware,
      employeeApi.middleware,
      onHandInventoryApi.middleware,
      modifiersApi.middleware,
      productsdealApi.middleware,
      productsApi.middleware,
      pricelistApi.middleware,
      categoriesApi.middleware,
      storesApi.middleware,
      pricelistApi.middleware,
      kitApi.middleware,
      filtersApi.middleware,
      customersApi.middleware,
      orderBycustomersApi.middleware,
      pricelistApi.middleware,
      paymentApi.middleware,
      taxApi.middleware,
      pricelistApi.middleware,
      OrderHistoryApi.middleware,
      reportsApi.middleware,
      tenantAPIs.middleware,
      ErrorLoggerMiddleware,
      discountCodeApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
