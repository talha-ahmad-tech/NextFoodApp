import { AgGridForm } from '@fridayfood/shared/components';
import React, { useEffect, useState } from 'react';
import { DealRecipesColDefs } from '../config';
import { useProductDealLinesHook } from '../productDealLinesHook';

import { IDealLines, IDealRecipesLines } from '../types';
import { ICellRendererParams } from 'ag-grid-community';
import { Image } from 'react-bootstrap';

const DealLines: React.FC<IDealLines> = ({ type }) => {
  const {
    CustomCellEditorParamsForRecipes,
    onCellValueChangedForRecipes,
    lines,
    fetchOptions,
    setLines,
  } = useProductDealLinesHook();

  const [component, setComponent] = useState<{
    products: string[];
    ingredients: string[];
  }>({ products: [], ingredients: [] });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = async () => {
      const product = await fetchOptions('/api/app/products/finished-lookup');
      const ingredient = await fetchOptions(
        '/api/app/ingredient/deal-lookup?type=2',
      );
      setComponent({
        ...component,
        products: product,
        ingredients: ingredient,
      });
    };

    result();
  }, []);
  const DeleteAction = (props: ICellRendererParams) => {
    const buttonClicked = () => {
      const linesData =
        type === 'recipes' ? lines?.recipesLines : lines?.detailsLines;
      const totalCost = linesData[props.rowIndex]?.totalCost;
      const copyRow = linesData?.filter(
        (_: IDealRecipesLines, index: number) => index !== props.rowIndex,
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

    if (props?.data?.action) {
      return <></>;
    }

    return (
      <div>
        <span onClick={() => buttonClicked()}>
          <Image
            src="/assets/svgs/delete.svg"
            alt="dell"
            width={20}
            height={20}
          />
        </span>
      </div>
    );
  };
  const cols = DealRecipesColDefs(
    CustomCellEditorParamsForRecipes,
    DeleteAction,
    component,
  );

  const rowData =
    type === 'recipes' ? lines?.recipesLines : lines?.detailsLines;

  const total = lines?.recipesLines?.reduce(
    (
      pre: {
        totalCost: number;
        cost: number;
        componentCost: number;
        tax: number;
        salePrice: number;
        quantity: number;
      },
      cr: {
        totalCost: number;
        cost: number;
        componentCost: number;
        tax: number;
        salePrice: number;
        quantity: number;
      },
    ) => {
      return {
        cost: Number(pre.cost) + Number(cr.cost),
        componentCost: Number(pre.cost) + Number(cr.cost),
        tax: Number(pre.tax) + Number(cr.tax),
        salePrice: Number(pre.salePrice) + Number(cr.salePrice),
        quantity: Number(pre.quantity) + Number(cr.quantity),
      };
    },
    { cost: 0, componentCost: 0, salePrice: 0, tax: 0, quantity: 0 },
  );

  const devider = total?.salePrice - total?.tax;
  const profit = devider > 0 ? 1 - total?.cost / devider : 0;
  const inTakeMargin = total?.salePrice - total?.tax - total?.cost ?? 0;

  const pinnedBottomRowData = [
    {
      editable: (o: { node: { isRowPinned: () => boolean } }) =>
        !o.node.isRowPinned(),
      componentTypeValue: 'Grand Total',
      quantity: total.quantity,
      cost: total.cost,
      tax: total.tax,
      salePrice: Number(total.salePrice),
      grossMargin: inTakeMargin,
      grossProfit: profit,
      action: true,
    },
  ];

  return (
    <div>
      <AgGridForm
        autoHeightTable={rowData?.length > 3 ? false : true}
        columnDefs={cols}
        rowData={rowData}
        onCellValueChanged={onCellValueChangedForRecipes}
        pinnedBottomRowData={pinnedBottomRowData}
      />
    </div>
  );
};

export default DealLines;
