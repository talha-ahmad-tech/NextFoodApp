import { AgGridForm } from '@fridayfood/shared/components';
import React from 'react';
import { uomCols } from '../config';
import { useUOMLinesHook } from '../Add/useUOMLines';

const UOMLinesEnhancer = () => {
  const { CustomCellEditorParams, onCellValueChanged, rowData } =
    useUOMLinesHook();

  const cols = [...uomCols(CustomCellEditorParams)];
  return (
    <div>
      <AgGridForm
        columnDefs={cols}
        rowData={rowData}
        onCellValueChanged={onCellValueChanged}
      />
    </div>
  );
};

export default UOMLinesEnhancer;
