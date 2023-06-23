import { AgGridForm, FormFooterActions } from '@fridayfood/shared/components';
import React from 'react';
import { AddLinesDefs } from '../../config';
import { useInventoryAdjustment } from './useInventoryAdjustment';
import { INVENTORY_ADJUSTMENT_DETAIL, IrowFormat } from '../../types';
import { useSelector } from 'react-redux';
// import { IState } from '../../inventoryAdjustment.slice';
import { RootState } from '@/lib/store';
import { useCreateInventoryAdjustmentMutation } from 'services/modules/inventoryAdjustment.api';
import { useRouter } from 'next/router';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';

const InventoryAdjustmentLines = (props?: INVENTORY_ADJUSTMENT_DETAIL) => {
  const {
    onCellValueChanged,
    setActiveTab,
    CustomCellEditorParams,
    rowData,
    setRowData,
  } = useInventoryAdjustment();

  const router = useRouter();

  // const [rowData, setRowData] = useState<IrowFormat[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { inventoryAdjustmentHeader }: any = useSelector(
    (state: RootState) => state?.inventoryAdjustmentReducer,
  );

  const rowFormat = {
    productId: null,
    productName: '',
    ingredientId: 0,
    modifierValueId: 0,
    modifierId: 0,
    purchaseUomId: '',
    purchaseUomName: '',
    productType: '',
    productTypeName: '',
    quantity: 0,
    unitCost: 0,
    totalCost: 0,
    // documentReference: inventoryAdjustmentHeader?.documentReference,
    remarks: '',
    onhandInventoryId: 0,
    inventoryAdjustmentId: 0,
  };
  // useEffect(() => {
  //   if (props?.id) {
  //     const editRow = props?.priceListDetails;
  //     setRowData(editRow ? editRow : []);
  //   } // setRowData(editRow);
  // }, [props?.id]);

  const updatedRows = rowData.length ? [...rowData] : [];

  const payload = {
    name: inventoryAdjustmentHeader?.name,
    description: inventoryAdjustmentHeader?.description,
    date: inventoryAdjustmentHeader?.date,
    time: inventoryAdjustmentHeader?.time,
    reason: parseInt(inventoryAdjustmentHeader?.reason),
    documentRefrence: inventoryAdjustmentHeader?.documentReference,
    ...(props?.id && { id: Number(props?.id) }),
    supplierName: inventoryAdjustmentHeader?.supplierName,
    supplierId: Number(inventoryAdjustmentHeader?.supplierId),
    storeId: Number(inventoryAdjustmentHeader?.storeId),
    storeName: inventoryAdjustmentHeader?.storeName,
    inventoryAdjustmentDetails: rowData?.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (items: any) => ({
        ...items,
        ingredientId: items?.ingredientId ? items?.ingredientId : null,
        modifierId: items?.modifierId ? items?.modifierId : null,
        modifierValueId: items?.modifierValueId ? items?.modifierValueId : null,
      }),
    ),
  };

  const [createUpdateIAdjustment] = useCreateInventoryAdjustmentMutation();

  const handleSave = async () => {
    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: { [key: string]: string | number };
    } = await createUpdateIAdjustment(payload);
    if (response?.data) {
      router.push(
        `/inventorymanagement/inventoryAdjustment/${response?.data?.id ?? ''}`,
      );
    }
  };

  const addNewRow = () => {
    const toSetRow: IrowFormat = {
      ...rowFormat,
    };
    updatedRows.unshift(toSetRow);
    setRowData([...updatedRows]);
  };

  const rightActions = [
    {
      title: 'Add Lines',
      onClick: addNewRow,
    },
  ];

  return (
    <div>
      <AgGridForm
        columnDefs={AddLinesDefs(CustomCellEditorParams)}
        rowData={rowData.length ? rowData : []}
        onCellValueChanged={onCellValueChanged}
        rightActions={rightActions}
      />
      <FormFooterActions
        handleSave={handleSave}
        isLastStep={true}
        handleBack={() => {
          setActiveTab(0);
        }}
      />
    </div>
  );
};

export default InventoryAdjustmentLines;
