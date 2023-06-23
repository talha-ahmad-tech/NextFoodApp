/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GridReadyEvent } from 'ag-grid-community';
import { columnDefs } from './config';
import { GeneralListing } from '@fridayfood/shared/components';
import {
  ProductMixReportApis,
  useFetchProductMixReportQuery,
} from 'services/modules/productMixReport.api';
import { Loader } from '@fridayfood/ui-toolkit';
import { useState } from 'react';
import { DateTimeFilters } from 'components/FilterHeader/DateTimeFilters';
import moment from 'moment';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useSelectionGetter } from '@/utils/customHooks/useGetOtions';

const today = moment().format('MM-DD-YYYY');
const startTime = ' 00:00:00';
const endTime = ' 23:59:00';
const endDate = today + endTime;

const ProductMixReport = () => {
  const [dates, setDates] = useState<{
    start: string;
    end: string;
    StoreIds?: any;
    ProductIds?: any;
    filter?: any;
  }>({ start: today + startTime, end: endDate });

  const storesOptions = useSelectionGetter({
    endPoint: ProductMixReportApis.storeLookup,
    method: 'get',
    key: 'store',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    baseURLType: 'core',
    simpleOptions: true,
  });

  const productsOptions = useSelectionGetter({
    endPoint: ProductMixReportApis.productLookup,
    method: 'get',
    key: 'product',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    baseURLType: 'products',
    simpleOptions: true,
  });

  const [grid, setGrid] = useState<any>({});
  // const [fetchProductMixReport] = useLazyFetchProductMixReportQuery();
  const { data, isSuccess, isFetching, isLoading } =
    useFetchProductMixReportQuery({
      StoreIds: JSON.stringify(dates?.StoreIds),
      ProductIds: JSON.stringify(dates?.ProductIds),
      StartDate: dates?.start,
      EndDate: dates?.end,
    });

  const onRowSelect = () => {
    // const { id } = event?.data;
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGrid(params);
    if (isSuccess) {
      grid?.api?.hideOverlay();
    }
    if (isFetching || isLoading) {
      params?.api?.showLoadingOverlay();
    }
  };

  const sumObject = {
    sumQuantity: 0,
    sumGrossRevenue: 0,
    sumNetRevenue: 0,
  };

  data?.forEach(
    (item: { quantity: number; grossRevenue: number; netRevenue: number }) => {
      sumObject.sumQuantity += item.quantity;
      sumObject.sumGrossRevenue += item.grossRevenue;
      sumObject.sumNetRevenue += item.netRevenue;
    },
  );

  return (
    <>
      <>{isLoading || isFetching ? <Loader /> : null}</>
      <GeneralListing
        customizedFilter={
          <div className="row">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <div className="custom-padding-right">
                  <Field
                    isFullWidth
                    type="multiselect"
                    componentType="listwithcount"
                    options={storesOptions}
                    label={'Store'}
                    name={'store'}
                    onChange={(e: []) => {
                      let resultantStores: string[] = [];
                      e?.forEach((items: { id: string }) => {
                        resultantStores = [...resultantStores, items?.id];
                      });
                      setDates({ ...dates, StoreIds: resultantStores });
                    }}
                  />
                </div>
                <div className="custom-padding-right">
                  <Field
                    isFullWidth
                    type="multiselect"
                    componentType="listwithcount"
                    options={productsOptions}
                    label={'Products'}
                    name={'product'}
                    onChange={(e: []) => {
                      let resultantProducts: string[] = [];
                      e?.forEach((items: { id: string }) => {
                        resultantProducts = [...resultantProducts, items?.id];
                      });
                      setDates({ ...dates, ProductIds: resultantProducts });
                    }}
                  />
                </div>
              </div>
              <div style={{ width: '40%' }}>
                <DateTimeFilters
                  onFilterChange={(values: {
                    start: string;
                    end: string;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    filter?: any;
                  }) => {
                    setDates({
                      ...dates,
                      start: values.start,
                      end: values?.end,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        }
        pinnedBottomRowData={[
          {
            quantity: sumObject?.sumQuantity,
            grossRevenue: sumObject?.sumGrossRevenue,
            netRevenue: sumObject?.sumNetRevenue,
          },
        ]}
        importOptionRequired={false}
        rowSelection="single"
        rowData={data ? data : []}
        columnDefs={columnDefs}
        onRowSelected={onRowSelect}
        onGridReady={onGridReady}
        title="Product Mix Report"
      />
    </>
  );
};

export default ProductMixReport;
