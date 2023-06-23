import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import { useFetchTaxQuery } from 'services/modules/tax.api';

import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import PaginatedComponent from '@fridayfood/shared/components/PaginatedComponent';
import { PAGINATION } from '@/utils/helper';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import FileImporter from 'components/ImportExportFiles/FileImporter';
import { LOADER_TYPE } from '@/utils/constants';

const Tax = () => {
  const router = useRouter();
  const [config, setConfig] = useState<{
    page: number;
    size: number;
  }>({
    page: 1,
    size: PAGINATION,
  });
  const [record, setRecord] = useState({
    rowData: [],
    totalCount: 0,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});
  const { data, isSuccess, isFetching } = useFetchTaxQuery(config);

  useEffect(() => {
    onGridReady(grid);
    if (data?.items?.length || isSuccess) {
      setRecord({ rowData: data?.items, totalCount: data?.totalCount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, grid?.api, isFetching, isSuccess]);

  const onRowSelect = (event: RowSelectedEvent) => {
    const { id } = event?.data;
    router.push(`/settings/tax/${id}`);
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
      <FileImporter type={LOADER_TYPE.TAX as keyof typeof LOADER_TYPE} />
      <GeneralListing
        importOptionRequired={true}
        paginatedComponent={
          <PaginatedComponent
            currentPage={config.page}
            totalCount={record?.totalCount}
            pageSize={config.size}
            onPageChange={(page: number) => setConfig({ ...config, page })}
          />
        }
        rowSelection="multiple"
        rowData={record?.rowData}
        columnDefs={columnDefs}
        onRowSelected={onRowSelect}
        onGridReady={onGridReady}
        title="Tax"
        btnTitle={'Add Tax'}
        onBtnClick={() => router.push('/settings/tax/add')}
      />
    </>
  );
};

export default withPermissions(Tax, {
  permissionName: PERMISSIONS.VIEW_TAX,
});
