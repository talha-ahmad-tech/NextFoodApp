import SwitchButton from '@fridayfood/ui-toolkit/src/FormFields/SwitchButton';
import type { CellValueChangedEvent } from 'ag-grid-community';
import React from 'react';
import { useProductDealLinesHook } from './productDealLinesHook';

const CustomStatusRenderer = (params: CellValueChangedEvent) => {
  const { lines, setLines } = useProductDealLinesHook();
  const colId: string = params.colDef.field || '';
  if (params.node.rowPinned) {
    return undefined;
  }
  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    params.data[colId] = e.target.checked;
    const index = Number(params?.rowIndex);
    const totalCost = Number(lines['recipesLines'][index]?.cost);
    if (colId === 'isCollection') {
      if (!e.target.checked) {
        setLines({
          ...lines,
          cost: {
            ...lines.cost,
            collectionCost: Number(
              Number(lines?.cost?.collectionCost) - totalCost,
            ),
          },
        });
      } else {
        setLines({
          ...lines,
          cost: {
            ...lines.cost,
            collectionCost: Number(lines?.cost?.collectionCost) + totalCost,
          },
        });
      }
    }
    if (colId === 'isDelivery') {
      if (!e.target.checked) {
        setLines({
          ...lines,
          cost: {
            ...lines.cost,
            deliveryCost: Number(lines?.cost?.deliveryCost - totalCost),
          },
        });
      } else {
        setLines({
          ...lines,
          cost: {
            ...lines.cost,
            deliveryCost: lines?.cost?.deliveryCost + totalCost,
          },
        });
      }
    }
    if (colId === 'isInStore') {
      if (!e.target.checked) {
        setLines({
          ...lines,
          cost: {
            ...lines.cost,
            eatInCost: Number(Number(lines?.cost?.eatInCost) - totalCost),
          },
        });
      } else {
        setLines({
          ...lines,
          cost: {
            ...lines.cost,
            eatInCost: Number(lines?.cost?.eatInCost) + totalCost,
          },
        });
      }
    }
  };

  return (
    <div className="custom-center-toggle">
      <SwitchButton
        label={''}
        errorMessage={''}
        value={params.value}
        defaultChecked={params?.data[colId]}
        onChange={handleSwitch}
        onBlur={undefined}
        name={''}
        isFullWidth
      />
    </div>
  );
};

export default CustomStatusRenderer;
