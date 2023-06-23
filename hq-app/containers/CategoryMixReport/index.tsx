/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GridReadyEvent } from 'ag-grid-community';
import { columnDefs } from './config';
import { GeneralListing } from '@fridayfood/shared/components';
import {
  useFetchCategoryMixReportQuery,
  CategoryMixReportApis,
} from 'services/modules/categoryMixReport.api';
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

const CategoryMixReport = () => {
  const [dates, setDates] = useState<{
    start: string;
    end: string;
    StoreIds?: any;
    ProductIds?: any;
    filter?: any;
  }>({ start: today + startTime, end: endDate });
  const [grid, setGrid] = useState<any>({});

  const { data, isSuccess, isFetching, isLoading } =
    useFetchCategoryMixReportQuery({
      StoreIds: JSON.stringify(dates?.StoreIds),
      CategoryIds: JSON.stringify(dates?.ProductIds),
      StartDate: dates?.start,
      EndDate: dates?.end,
    });

  const onRowSelect = () => {
    // const { id } = event?.data;
    // router.push(`/orderhistory/${id}`);
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

  const stores = useSelectionGetter({
    endPoint: CategoryMixReportApis.storeLookup,
    method: 'get',
    key: 'store',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    baseURLType: 'core',
    simpleOptions: true,
  });

  const categoryOptions = useSelectionGetter({
    endPoint: CategoryMixReportApis.categoryLookup,
    method: 'get',
    key: 'category',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    baseURLType: 'products',
    simpleOptions: true,
  });
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
                    options={stores}
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
                    options={categoryOptions}
                    label={'Category'}
                    name={'category'}
                    onChange={(e: []) => {
                      let resultantCategory: string[] = [];
                      e?.forEach((items: { id: string }) => {
                        resultantCategory = [...resultantCategory, items?.id];
                      });
                      setDates({ ...dates, StoreIds: resultantCategory });
                    }}
                  />
                </div>
              </div>
            </div>
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
        title="Category Mix Report"
      />
    </>
  );
};

export default CategoryMixReport;
