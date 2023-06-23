import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import { useLazyFetchfoodCostingQuery } from 'services/modules/foodCosting.api';

import type {
  GridReadyEvent,
  RowSelectedEvent,
  IGetRowsParams,
} from 'ag-grid-community';
import {
  AgGrid,
  Icon,
  ListHeaderWrapper,
  ListingHeaderBar,
  SectionWrapper,
  TableGrid,
} from '@fridayfood/shared/components';
import { AgGridReact } from 'ag-grid-react';
import { Image } from 'react-bootstrap';
import { useMemo, useState } from 'react';
import ImportExportFiles from '@fridayfood/shared/components/ImportExportFiles';
import { DateTimeFilters } from 'components/FilterHeader/DateTimeFilters';
import moment from 'moment';

const foodCosting = () => {
  const router = useRouter();
  const today = moment().format('MM-DD-YYYY');
  const startTime = ' 00:00:00';
  const endTime = ' 23:59:00';
  const endDate = today + endTime;

  const [dates, setDates] = useState<{
    start: string;
    end: string;
    StoreIds?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter?: any;
  }>({ start: today + startTime, end: endDate, StoreIds: [] });
  const [showFilter, setShowFilter] = useState(false);
  const [fetchfoodCosting] = useLazyFetchfoodCostingQuery();
  const datasource = (props: GridReadyEvent) => {
    return {
      async getRows(params: IGetRowsParams) {
        const { data, isSuccess } = await fetchfoodCosting(params);
        if (data?.result?.length || isSuccess) {
          props.api.hideOverlay();
        }
        params.successCallback(
          data?.result,
          data?.result?.length ? data?.result?.length : 0,
        );
      },
    };
  };

  const onRowSelect = (event: RowSelectedEvent) => {
    const { id = 0 } = event.data;
    router.push(`/foodCosting/${id}`);
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.setDatasource(datasource(params));
    params.api.showLoadingOverlay();
  };
  const pinnedBottomRow = [
    {
      productName: 'Grand Total',
      grossProfitReview: 0,
      grossMarginReview: 40,
      costReview: 0,
      netSalesReview: 0,
      discountReview: 0,
      saleTaxReview: 0,
      reviewGrossSales: 0,
      reviewUnitSales: 0,
      pinnedRow: true,
    },
  ];
  const rowData = [
    {
      productName: 'Grand Total',
      grossProfitReview: 0,
      grossMarginReview: 40,
      costReview: 0,
      netSalesReview: 0,
      discountReview: 0,
      saleTaxReview: 0,
      reviewGrossSales: 0,
      reviewUnitSales: 0,
    },
    {
      productName: 'Grand Total',
      grossProfitReview: 0,
      grossMarginReview: 10,
      costReview: 0,
      netSalesReview: 0,
      discountReview: 0,
      saleTaxReview: 0,
      reviewGrossSales: 0,
      reviewUnitSales: 0,
    },
    {
      productName: 'Grand Total',
      grossProfitReview: 0,
      grossMarginReview: 40,
      costReview: 0,
      netSalesReview: 0,
      discountReview: 0,
      saleTaxReview: 0,
      reviewGrossSales: 0,
      reviewUnitSales: 0,
    },
    {
      productName: 'Grand Total',
      grossProfitReview: 0,
      grossMarginReview: 40,
      costReview: 0,
      netSalesReview: 0,
      discountReview: 0,
      saleTaxReview: 0,
      reviewGrossSales: 0,
      reviewUnitSales: 0,
    },
    {
      productName: 'Grand Total',
      grossProfitReview: 0,
      grossMarginReview: 40,
      costReview: 0,
      netSalesReview: 0,
      discountReview: 0,
      saleTaxReview: 0,
      reviewGrossSales: 0,
      reviewUnitSales: 0,
    },
    {
      productName: 'Grand Total',
      grossProfitReview: 0,
      grossMarginReview: 40,
      costReview: 0,
      netSalesReview: 0,
      discountReview: 0,
      saleTaxReview: 0,
      reviewGrossSales: 0,
      reviewUnitSales: 0,
    },
  ];
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      filter: true,
    };
  }, []);
  return (
    <div className="ag-theme-alpine">
      <div className="custom-aggrid-table custom-table-height ag-height">
        <ListingHeaderBar title="Food Costing" />
        <div className="custom-flex-between mb-4">
          <div></div>
          <div className="custom-flex-start align-items-center">
            <button
              type="button"
              className="custom-blue-outline-btn"
              onClick={() => setShowFilter(!showFilter)}
              disabled={false}
            >
              <Icon variant={'tick'} style={{ marginRight: 10 }} />
              {'Filters'}
            </button>
            <ImportExportFiles />
          </div>
        </div>
        {showFilter && (
          <DateTimeFilters
            onFilterChange={(values: {
              start: string;
              end: string;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              filter?: any;
            }) => {
              setDates({ ...dates, start: values.start, end: values?.end });
            }}
          />
        )}
        <hr />
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          // domLayout="normal"
          defaultColDef={defaultColDef}
          // sideBar={'columns'}
          // onGridReady={onGridReady}
          pinnedBottomRowData={pinnedBottomRow}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default foodCosting;
