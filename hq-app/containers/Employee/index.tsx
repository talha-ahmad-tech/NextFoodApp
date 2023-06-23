import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import { useFetchEmployeesQuery } from 'services/modules/employee.api';
import { useEffect, useState } from 'react';
import PaginatedComponent from '@fridayfood/shared/components/PaginatedComponent';
import {
  GridReadyEvent,
  RowSelectedEvent,
} from 'ag-grid-community/dist/lib/events';
import { PAGINATION } from '@/utils/helper';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
import FileImporter from 'components/ImportExportFiles/FileImporter';
import { LOADER_TYPE } from '@/utils/constants';

const Employee = () => {
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
  const { data, isSuccess, isFetching } = useFetchEmployeesQuery(config);

  useEffect(() => {
    onGridReady(grid);
    if (data?.items?.length) {
      setRecord({ rowData: data?.items, totalCount: data?.totalCount });
    }
  }, [data, grid?.api, isFetching, isSuccess]);

  const onRowSelect = (event: RowSelectedEvent) => {
    const { id } = event?.data;
    router.push(`/staffmanagement/employee/${id}`);
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
      <FileImporter type={LOADER_TYPE.EMPLOY as keyof typeof LOADER_TYPE} />
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
        rowData={record?.rowData}
        columnDefs={columnDefs}
        rowSelection="single"
        onRowSelected={onRowSelect}
        onGridReady={onGridReady}
        title="Employee"
        btnTitle={'Add Staff'}
        onBtnClick={() => {
          router.push('/staffmanagement/employee/add');
        }}
      />
    </>
  );
};

export default withPermissions(Employee, {
  permissionName: PERMISSIONS.VIEW_EMPLOYEE,
});
