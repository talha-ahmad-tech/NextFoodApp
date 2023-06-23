import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import {
  useFetchCompanyQuery,
  // useLazyFetchCompanyQuery,
} from 'services/modules/company.api';

import type {
  GridReadyEvent,
  // GridReadyEvent,
  RowSelectedEvent,
  // IGetRowsParams,
} from 'ag-grid-community';
import { PAGINATION } from '@/utils/helper';
import { useState } from 'react';
import { PaginatedComponent } from '@fridayfood/shared/components';
import FileImporter from 'components/ImportExportFiles/FileImporter';
import { LOADER_TYPE } from '@/utils/constants';

const Company = () => {
  const router = useRouter();
  const [config, setConfig] = useState<{
    page: number;
    size: number;
  }>({
    page: 1,
    size: PAGINATION,
  });
  const [record] = useState({
    rowData: [
      {
        companyName: 'Dummy Name',
        VATNumber: 'Dummy',
        currency: 'Dummy',
        language: 'Dummy',
        timeZone: 'Dummy',
        whiteLabelApp: 'Dummy',
        active: 'Dummy',
      },
    ],
    totalCount: 0,
  });
  // const [grid, setGrid] = useState({});
  const { isSuccess, isFetching } = useFetchCompanyQuery(config);

  // useEffect(() => {
  //   onGridReady(grid);
  //   if (data?.items?.length) {
  //     // setRecord({ rowData: data?.items, totalCount: data?.totalCount });
  //   }
  // }, [data, grid?.api, isFetching, isSuccess]);

  const onRowSelect = (event: RowSelectedEvent) => {
    const id = event?.data.id;
    router.push(`/settings/company/${id}`);
  };
  const onGridReady = (params: GridReadyEvent) => {
    // setGrid(params);
    if (isSuccess) {
      // grid?.api?.hideOverlay();
    }
    if (isFetching) {
      params?.api?.showLoadingOverlay();
    }
  };

  return (
    <>
      <FileImporter type={LOADER_TYPE.COMPANY as keyof typeof LOADER_TYPE} />
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
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        rowData={record?.rowData}
        onRowSelected={onRowSelect}
        rowSelection="single"
        title="Company"
        btnTitle={'Add Company'}
        onBtnClick={() => router.push('/settings/company/add')}
      />
    </>
  );
};

export default Company;
