import {
  ToggleContext,
  ToggleDispatchContext,
} from '@fridayfood/shared/components/Context/ToggleContext';
import React, { useContext, useState } from 'react';
import { getMethod } from 'services/axios';
import { PriceListApis } from 'services/modules/pricelist.api';

import type {
  CellValueChangedEvent,
  // ICellRendererParams,
} from 'ag-grid-community';
import {
  AgGridSelectEditor,
  FiltersContext,
  FiltersListContext,
  SetFiltersContext,
  SetFiltersListContext,
} from '@fridayfood/shared/components';
import { Field } from '@fridayfood/ui-toolkit';
import { useAuth } from 'oidc-react';
import { urlConverter } from '@/utils/helper';
import axios from 'axios';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { IrowFormat } from '../../types';
interface ITempValues {
  onhandInventoryId?: number;
  purchaseUom: { name: string };
  ingredientId?: number;
  modifierId?: number;
  modifierValueId?: number;
  productId: number;

  purchaseUomId: string;
  productType(productType: string): string;
  name?: string;
  value: number | string;
  label?: string;
  cost?: number;
  id?: number | string;
}
export const useInventoryAdjustment = () => {
  const activeTab = useContext(ToggleContext);
  const setActiveTab = useContext(ToggleDispatchContext);

  const [rowData, setRowData] = useState<IrowFormat[]>([]);

  const filters = useContext(FiltersContext);
  const setFilters = useContext(SetFiltersContext);

  const filtersQuery = useContext(FiltersListContext);
  const setFiltersQuery = useContext(SetFiltersListContext);
  const { getOptions } = useGetOptions();
  const auth = useAuth();

  const ingredientOptions = async () => {
    const url =
      urlConverter('products') + '/api/app/' + 'onhand-inventory/lookup';

    const { data, status } = await axios({
      method: 'get', //you can set what request you want to be
      url,
      headers: {
        Authorization: 'Bearer ' + auth.userData?.access_token,
        'Content-Type': 'application/json',
      },
    });

    let options: { [key: string]: string }[] = [];

    if (status === 200) {
      options = data?.map(
        (item: {
          id: number;
          ingredient?: { name: string; id: number };
          modifier?: { name: string; id: number };
          modifierValue?: { name: string; id: number };
        }) => ({
          label: item.ingredient
            ? item.ingredient?.name
            : item.modifier
            ? item.modifier?.name
            : item.modifierValue?.name,

          value: item.ingredient
            ? item.ingredient?.id
            : item.modifier
            ? item.modifier?.id
            : item.modifierValue?.id,

          ingredientId: item?.ingredient?.id ?? null,
          modifierValueId: item?.modifierValue?.id ?? null,
          modifierId: item?.modifier?.id ?? null,
          onhandInventoryId: item?.id,
        }),
      );
      return {
        options,
        hasMore: false,
      };
    } else {
      return {
        options: [],
        hasMore: false,
      };
    }
  };
  const componentTypeEnum = (value: number) => {
    switch (value) {
      case 1:
        return 'Ingredient';
      case 2:
        return 'Packaging Material';
      case 3:
        return 'Modifier';
      default:
        break;
    }
  };

  const reasonConversion = (type: string | number) => {
    switch (type) {
      case 0:
        return 'Purchase';
      case 1:
        return 'StockIn';
      case 2:
        return 'StockOut';
      case 3:
        return 'Wastage';
      case 4:
        return 'Damage';

      case 5:
        return 'Adjustment';

      default:
        break;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomCellEditorParams = (props: any) => {
    const colId = props?.column?.colDef?.field;

    const handleChange = (values: ITempValues) => {
      if (colId === 'productIdName') {
        props.data.productIdName = values?.label;
        props.data.productId = values?.value;
        props.data.productName = values?.label;
        props.data.productType = values?.ingredientId ? 1 : 3;

        props.data.onhandInventoryId = values?.onhandInventoryId;

        props.data.ingredientId =
          props?.data?.productType === 1 ? values?.ingredientId : null;

        props.data.modifierId =
          props?.data?.productType === 3 ? values?.modifierId : null;

        props.data.purchaseUomIdName = values?.purchaseUom?.name;
        props.data.purchaseUomId = values?.purchaseUomId;

        props.data.productTypeName = componentTypeEnum(
          Number(values?.ingredientId ? 1 : 3),
        );
        props.api.redrawRows();
        props.api.refreshCells();
      }
      if (colId === 'purchaseUomIdName') {
        props.data.purchaseUomIdName = values?.label;
        props.data.purchaseUomId = values?.value;
        props.api.redrawRows();
        props.api.refreshCells();
      }

      props.api.redrawRows();
      props.api.refreshCells();
    };

    return colId === 'productTypeName' ? (
      <AgGridSelectEditor
        handleChange={handleChange}
        data={props?.values ?? []}
        largeWrapper={false}
      />
    ) : (
      <Field
        linesWrapper
        type="options"
        loadOptions={
          colId === 'productIdName'
            ? ingredientOptions
            : getOptions({
                paramsKey:
                  props?.data?.props?.data?.componentTypeUrl ??
                  props?.data?.componentType,
                endPoint: '/api/app/uom/lookup',
                method: 'get',
                key: 'itemGroupId',
                fieldsToShow: ['name'],
                dataPickFromItems: true,
                baseURLType: 'products',
              })
        }
        label=" "
        name="componentName"
        onChange={handleChange}
      />
    );
  };

  const onCellValueChanged = (props: CellValueChangedEvent) => {
    const { data } = props || {};
    props.data.totalCost = Number(data?.unitCost) * Number(data?.quantity) ?? 0;
    props.data.unitCost = Number(data?.unitCost) ?? 0;

    props.data.quantity = Number(data?.quantity) ?? 0;
    props.data.remarks = data?.remarks ?? '';

    rowData[props.rowIndex ?? 0] = props?.data;
    setRowData([...rowData]);
    props.api.redrawRows();
    props.api.refreshCells();
  };

  const getMultiOptions = async () => {
    let options = [];
    const response = await getMethod({
      url: `${PriceListApis.getStore}`,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
    });

    if (response?.status === 200) {
      options = response?.data?.map((item: { name?: string; id?: number }) => ({
        ...item,
        label: item?.name,
        value: item?.id,
      }));

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
    filters,
    filtersQuery,
    setFilters,
    setFiltersQuery,
    componentTypeEnum,
    reasonConversion,
    ingredientOptions,
    rowData,
    setRowData,
  };
};
