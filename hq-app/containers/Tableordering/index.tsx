import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import { useLazyFetchTableorderingQuery } from 'services/modules/tableordering.api';

import type {
  GridReadyEvent,
  RowSelectedEvent,
  IGetRowsParams,
} from 'ag-grid-community';

const Tableordering = () => {
  const router = useRouter();

  const [fetchTableordering] = useLazyFetchTableorderingQuery();
    const datasource = (props: GridReadyEvent) => {
    return {
      async getRows(params: IGetRowsParams) {
        const { data } = await fetchTableordering(params);
        if (data?.result?.length) {
          props.api.hideOverlay();
        }
        params.successCallback(data?.result, data?.result?.length);
      },
    };
  };

  const onRowSelect = (event: RowSelectedEvent) => {
    const { id = 0 } = event?.data;
    router.push(`/tableordering/${id}`);
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.setDatasource(datasource(params));
    params.api.showLoadingOverlay();
  };

  return (
    <GeneralListing
      columnDefs={columnDefs}
      onGridReady={onGridReady}
      onRowSelect={onRowSelect}
      title="All Tableordering"
      btnTitle={'Add Tableordering'}
      onBtnClick={() => router.push('/tableordering/add')}
    />
  );
};

export default Tableordering;
