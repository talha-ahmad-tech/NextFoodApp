// import { useRouter } from 'next/router';

import type { GridReadyEvent, IGetRowsParams } from 'ag-grid-community';
import { columnDefs } from './config';
import { GeneralListing } from '@fridayfood/shared/components';
import { useLazyFetchOrderHistoryQuery } from 'services/modules/orderhistory.api';

const OrderHistory = () => {
  const [fetchOrderHistory] = useLazyFetchOrderHistoryQuery({});
  const datasource = (props: GridReadyEvent) => {
    return {
      async getRows(params: IGetRowsParams) {
        const { data, isSuccess } = await fetchOrderHistory(params);
        if (data?.length || isSuccess) {
          props.api.hideOverlay();
        }
        params.successCallback(data, data?.length ? data?.length : 0);
      },
    };
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.setDatasource(datasource(params));
    params.api.showLoadingOverlay();
  };

  return (
    <GeneralListing
      columnDefs={columnDefs}
      onGridReady={onGridReady}
      title="Order History Report"
    />
  );
};

export default OrderHistory;
