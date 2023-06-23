import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import { useFetcthPaymentMethodQuery } from 'services/modules/payment.api';

import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { useState } from 'react';
import PaginatedComponent from '@fridayfood/shared/components/PaginatedComponent';
import { PAGINATION } from '@/utils/helper';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import FileImporter from 'components/ImportExportFiles/FileImporter';
import { LOADER_TYPE } from '@/utils/constants';

const Payment = () => {
  const router = useRouter();
  const [config, setConfig] = useState<{
    page: number;
    size: number;
  }>({
    page: 1,
    size: PAGINATION,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});

  const { data, isSuccess, isFetching } = useFetcthPaymentMethodQuery(config);

  const onRowSelect = (event: RowSelectedEvent) => {
    const { id } = event?.data;
    router.push(`/settings/payment/${id}`);
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGrid(params);
    if (isSuccess) {
      grid?.api?.hideOverlay();
    }
    if (isFetching) {
      params?.api?.showLoadingOverlay();
    }
  };

  return (
    <>
      <FileImporter
        type={LOADER_TYPE.PAYMENT_METHOD as keyof typeof LOADER_TYPE}
      />
      <GeneralListing
        importOptionRequired={true}
        paginatedComponent={
          <PaginatedComponent
            currentPage={config.page}
            totalCount={data?.totalCount}
            pageSize={config.size}
            onPageChange={(page: number) => setConfig({ ...config, page })}
          />
        }
        rowSelection="multiple"
        rowData={data?.items ?? []}
        columnDefs={columnDefs}
        onRowSelected={onRowSelect}
        onGridReady={onGridReady}
        title="Payment Method"
        btnTitle={'Add Payment Method'}
        onBtnClick={() => router.push('/settings/payment/add')}
      />
    </>
  );
};

export default withPermissions(Payment, {
  permissionName: PERMISSIONS.VIEW_PAYMENT_METHOD,
});
