import { RootState } from '@/lib/store';
import { AgGridForm, FormFooterActions } from '@fridayfood/shared/components';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCreateUpdatePriceListMutation } from 'services/modules/pricelist.api';
import {
  priceListCols,
  priceListDiscountCols,
  priceListPriceCols,
} from '../../config';
import { IState } from '../../pricelist.slice';
import { ADD_PRICELIST, IrowFormat } from '../../types';
import { usePriceListLinesHook } from './LinesHooks';
import Router from 'next/router';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';

const rowFormat = {
  productName: '-select-',
  storeTypeName: '-select',
  clusters: '-select',
  priceListStores: [{ storeName: '-select-' }],
  inStorePrice: 0,
  collectionPrice: 0,
  deliveryPrice: 0,
  discountPercentage: 0,
  discountAmount: 0,
};
const SalesPriceListLines = (props?: ADD_PRICELIST) => {
  const { CustomCellEditorParams, onCellValueChanged } =
    usePriceListLinesHook();
  const [rowData, setRowData] = useState<IrowFormat[]>([]);
  const { setActiveTab } = usePriceListLinesHook();
  const { priceType, headerData }: IState = useSelector(
    (state: RootState) => state?.pricelistReducer,
  );

  const payload = props?.id
    ? {
        dateFrom: headerData?.dateFrom,
        dateTill: headerData?.dateTill,
        description: headerData?.description,
        name: headerData?.name,
        priceType: Number(headerData?.priceType),
        status: headerData?.status,
        id: Number(props?.id),
        priceListDetails: rowData,
      }
    : {
        dateFrom: headerData?.dateFrom,
        dateTill: headerData?.dateTill,
        description: headerData?.description,
        name: headerData?.name,
        priceType: Number(headerData?.priceType),
        status: headerData?.status,
        priceListDetails: rowData,
      };
  const [createUpdatePriceList] = useCreateUpdatePriceListMutation();

  const handleSave = async () => {
    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: { [key: string]: string | number };
    } = await createUpdatePriceList(payload);
    if (response?.data) {
      Router.push(`/settings/pricelist/${response?.data?.id ?? ''}`);
    }
  };

  const customCols =
    priceType === 1 ? priceListPriceCols : priceListDiscountCols;

  const cols = [...priceListCols(CustomCellEditorParams), ...customCols];

  useEffect(() => {
    if (props?.id) {
      const editRow = props?.priceListDetails;
      setRowData(editRow ? editRow : []);
    } // setRowData(editRow);
  }, [props?.id]);

  const updatedRows = rowData.length ? [...rowData] : [];

  const addNewRow = () => {
    const toSetRow: IrowFormat = {
      ...rowFormat,
    };
    updatedRows.unshift(toSetRow);
    setRowData([...updatedRows]);
  };

  const leftActionButtons = [
    {
      title: 'Add Lines',
      onClick: addNewRow,
      showButton: true,
    },
  ];
  return (
    <div>
      <AgGridForm
        // autoHeightTable={type === 'recipes' ? true : true}
        columnDefs={cols}
        rowData={rowData.length ? rowData : []}
        onCellValueChanged={onCellValueChanged}
        leftActionButtons={leftActionButtons}
      />
      <FormFooterActions
        handleSave={handleSave}
        isLastStep={true}
        handleBack={() => {
          setActiveTab(0);
        }}

        // hideBackBtn
      />
    </div>
  );
};

export default SalesPriceListLines;
