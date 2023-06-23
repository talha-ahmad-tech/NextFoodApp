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

const Company = () => {
  const router = useRouter();
  const [config, setConfig] = useState<{
    page: number;
    size: number;
  }>({
    page: 1,
    size: PAGINATION,
  });

  // const [grid, setGrid] = useState({});
  const { isSuccess, isFetching, data } = useFetchCompanyQuery({
    PageIndex: config?.page,
    PageSize: config?.size,
  });

  // useEffect(() => {
  //   onGridReady(grid);
  //   if (data?.items?.length) {
  //     // setRecord({ rowData: data?.items, totalCount: data?.totalCount });
  //   }
  // }, [data, grid?.api, isFetching, isSuccess]);

  const onRowSelect = (event: RowSelectedEvent) => {
    const id = event?.data.id;
    router.push(`/companymanagement/company/${id}`);
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
    <GeneralListing
      paginatedComponent={
        <PaginatedComponent
          currentPage={config.page}
          totalCount={data?.totalCount}
          pageSize={config.size}
          onPageChange={(page: number) => setConfig({ ...config, page })}
        />
      }
      columnDefs={columnDefs}
      onGridReady={onGridReady}
      rowData={data?.items}
      onRowSelected={onRowSelect}
      rowSelection="single"
      title="Company"
      btnTitle={'Add Company'}
      onBtnClick={() => router.push('/companymanagement/company/add')}
    />
  );
};

export default Company;
