import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useFetchEmployeesQuery } from 'services/modules/employee.api';
import { useEffect, useState } from 'react';
import PaginatedComponent from '@fridayfood/shared/components/PaginatedComponent';
import {
  GridReadyEvent,
  RowSelectedEvent,
} from 'ag-grid-community/dist/lib/events';
import { PAGINATION } from '@/utils/helper';
import ModalCustom from '@fridayfood/ui-toolkit/src/Modal';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const DiscountCodeListing = () => {
  // const router = useRouter();
  const [open, setOpen] = useState(false);
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
    console.log('id', id);
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
        title="Discounts"
        btnTitle={'Add Discount'}
        onBtnClick={() => {
          setOpen(true);
        }}
      />

      <ModalCustom
        show={open}
        saveButtonType={'button'}
        close={() => setOpen(false)}
        noAction
        modalWidth="custom-small-modal"
        title="Select Type of Discount"
      >
        <div className="row m-0 pt-2 pb-4">
          <div className="col-sm-12 col-md-6 mb-4">
            <Link href={'Dummy Path 1'} className="link-card-btn">
              <Image
                src="/assets/svgs/icon-ingredients.svg"
                alt="no"
                width={60}
                height={60}
              />
              <span className="font-medium ps-4">
                Products & Category Discounts
              </span>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 mb-4">
            <Link href={'Dummy Path 2'} className="link-card-btn">
              <Image
                src="/assets/svgs/icon-packaging-material.svg"
                alt="no"
                width={60}
                height={60}
              />
              <span className="font-medium ps-4">Value Discount</span>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6">
            <Link href={'Dummy Path 3'} className="link-card-btn">
              <Image
                src="/assets/svgs/icon-finished-product.svg"
                alt="no"
                width={60}
                height={60}
              />

              <span className="font-medium ps-4">Quantity Discount</span>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6">
            <Link href={'Dummy Path 4'} className="link-card-btn">
              <Image
                src="/assets/svgs/icon-deal.svg"
                alt="no"
                width={60}
                height={60}
              />
              <span className="font-medium ps-4">Order Level Discount</span>
            </Link>
          </div>
        </div>
      </ModalCustom>
    </>
  );
};

export default DiscountCodeListing;
