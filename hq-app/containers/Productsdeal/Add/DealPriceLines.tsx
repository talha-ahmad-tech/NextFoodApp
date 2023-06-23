import { AgGridForm } from '@fridayfood/shared/components';
import React from 'react';
import { DealPriceColDefs } from '../config';
import { useProductDealLinesHook } from '../productDealLinesHook';

const DealPriceLines: React.FC<{
  type: number;
  rowData: {
    dealName: string;
    costPrice: number;
    salePrice: number;
    inTakeMargin: string;
    profit: number;
    dealPriceType?: number;
  }[];
}> = ({ type, rowData }) => {
  const {
    onCellValueChangedForDelivery,
    onCellValueChangedForStore,
    onCellValueChangedForCollection,
  } = useProductDealLinesHook();

  return (
    <div>
      <AgGridForm
        customHeight={true}
        autoHeightTable={Boolean(type)}
        columnDefs={DealPriceColDefs()}
        rowData={rowData}
        onCellValueChanged={
          type === 1
            ? onCellValueChangedForStore
            : type === 2
            ? onCellValueChangedForDelivery
            : onCellValueChangedForCollection
        }
      />
    </div>
  );
};

export default DealPriceLines;
