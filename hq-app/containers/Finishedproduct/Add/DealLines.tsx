import { AgGridForm, ListHeaderWrapper } from '@fridayfood/shared/components';
import Image from 'next/image';
import React from 'react';
import { DealRecipesColDefs } from '../config';
import { useProductDealLinesHook } from '../productDealLinesHook';

import type { ICellRendererParams } from 'ag-grid-community';
import { IDealLines, IFINISHEDPRODUCTRecipesLines } from '../types';

const DealLines: React.FC<IDealLines> = ({ type }) => {
  const {
    CustomCellEditorParamsForRecipes,
    onCellValueChangedForRecipes,
    lines,
    setLines,
  } = useProductDealLinesHook();

  const DeleteAction = (props: ICellRendererParams) => {
    const buttonClicked = () => {
      const linesData =
        type === 'recipes' ? lines?.recipesLines : lines?.detailsLines;
      const totalCost = linesData[props.rowIndex]?.totalCost;
      const copyRow = linesData?.filter(
        (_: IFINISHEDPRODUCTRecipesLines, index: number) =>
          index !== props.rowIndex,
      );

      setLines({
        ...lines,
        recipesLines: copyRow,
        cost: {
          collectionCost:
            Number(lines?.cost?.collectionCost) - Number(totalCost),
          deliveryCost: Number(lines?.cost?.deliveryCost) - Number(totalCost),
          eatInCost: Number(lines?.cost?.eatInCost) - Number(totalCost),
        },
      });
    };

    return (
      <span>
        <span onClick={() => buttonClicked()}>
          <Image
            src="/assets/svgs/delete.svg"
            alt="dell"
            width={20}
            height={20}
          />
        </span>
      </span>
    );
  };
  const cols = DealRecipesColDefs(
    DeleteAction,
    CustomCellEditorParamsForRecipes,
  );

  return (
    <div>
      <ListHeaderWrapper title="Ingredients & Packaging Material" />
      <AgGridForm
        // autoHeightTable
        customHeight
        columnDefs={cols}
        rowData={lines?.recipesLines}
        onCellValueChanged={onCellValueChangedForRecipes}
      />
    </div>
  );
};

export default DealLines;
