import React, { useContext, useState } from 'react';
import {
  ToggleContext,
  ToggleDispatchContext,
} from '@fridayfood/shared/components/Context/ToggleContext';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields';
import { useGetOptions } from '../../../utils/customHooks/useGetOtions';
import { UomApis } from '../../../services/modules/uom.api';
import { getMethod } from '../../../services/axios';
import { ADD_UPDATE_UOM_LINES } from '../types';
import type {
  CellValueChangedEvent,
  ICellRendererParams,
} from 'ag-grid-community';

interface IChange {
  name?: string;
  label?: string;
  value?: string;
}

export const useUOMLinesHook = () => {
  const { getOptions } = useGetOptions();
  const activeTab = useContext(ToggleContext);
  const setActiveTab = useContext(ToggleDispatchContext);
  const [rowData, setRowData] = useState<ADD_UPDATE_UOM_LINES[]>([
    { fromUnit: '', toUnit: '', fromQTY: 0, toQTY: 0 },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomCellEditorParams = (props: ICellRendererParams | any) => {
    const colId = props.colDef?.field || '';
    const handleChange = (values: IChange) => {
      if (colId === 'fromUnit') {
        props.data.fromUnit = values?.name;
        // props.data.name = values?.name;
      }
      if (colId === 'toUnit') {
        props.data.toUnit = values?.name;
        // props.data.name = values?.name;
      }
      props.api.redrawRows();
      props.api.refreshCells();
    };

    return (
      <Field
        linesWrapper
        type="options"
        loadOptions={getOptions({
          endPoint: UomApis.ListUOM,
          method: 'get',
          key: 'itemGroupId',
          v2: false,
          dataPickFromItems: true,
        })}
        label=" "
        name="quantities"
        onChange={handleChange}
        // largeWrapper
      />
    );
  };

  const onCellValueChanged = (props: CellValueChangedEvent) => {
    const { data } = props || {};
    const colId = props?.colDef.field || '';
    if (colId === 'fromQTY') {
      props.data.fromQTY = Number(data?.fromQTY);
    }
    if (colId === 'toQTY') {
      props.data.toQTY = Number(data?.toQTY);
    }

    props.api.redrawRows();
    props.api.refreshCells();
  };

  const getMultiOptions = async () => {
    let options = [];
    const response = await getMethod({
      url: `${UomApis.ListUOM}`,
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
    });

    if (response?.status === 200) {
      options = response?.data?.result?.items?.map(
        (item: { name?: string; id?: string }) => ({
          ...item,
          label: item?.name,
          value: item?.id,
        }),
      );
      return options;
    } else {
      return [];
    }
  };
  return {
    onCellValueChanged,
    CustomCellEditorParams,
    activeTab,
    setActiveTab,
    getMultiOptions,
    rowData,
    setRowData,
  };
};
