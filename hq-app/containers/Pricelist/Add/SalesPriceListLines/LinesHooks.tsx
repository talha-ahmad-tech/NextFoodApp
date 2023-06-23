import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import {
  ToggleContext,
  ToggleDispatchContext,
} from '@fridayfood/shared/components/Context/ToggleContext';
import { AgGridSelectEditor } from '@fridayfood/shared/components/AgGridForm/Components/AgGridSelectEditor';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields';
import React, { useContext, useState } from 'react';
import { getLineMethod } from 'services/axios';
import { PriceListApis } from 'services/modules/pricelist.api';

import type {
  CellValueChangedEvent,
  ICellRendererParams,
} from 'ag-grid-community';

import { useAuth } from 'oidc-react';
interface IChange {
  name?: string;
  label?: string;
  value?: string;
}
export const usePriceListLinesHook = () => {
  const { getOptions } = useGetOptions();
  const activeTab = useContext(ToggleContext);
  const setActiveTab = useContext(ToggleDispatchContext);
  const [storeList, setStoreList] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomCellEditorParams = (props: ICellRendererParams | any) => {
    const colId = props.colDef?.field || '';
    const handleChange = (values: IChange) => {
      if (colId === 'productTypeName') {
        props.data.productType = values?.value;
        props.data.productTypeName = values?.label;
        // props.data.name = values?.name;
      }
      if (colId === 'productName') {
        props.data.productName = values?.name;
        // props.data.name = values?.name;
      }
      if (colId === 'storeTypeName') {
        props.data.storeType = values?.value;
        props.data.storeTypeName = values?.label;
      }
      if (colId === 'priceListStores.storeName') {
        props.data.priceListStores = storeList;
      }
      if (colId === 'clusters') {
        props.data.clusters = values?.name;
        props.data.clusterId = values?.value;
      }
      if (colId === 'status') {
        props.data.status = values?.name;
      }
      if (colId === 'quantity') {
        props.data.quantity = values?.value;
      }
      if (colId === 'sellingUOM') {
        props.data.sellingUOM = values?.name;
      }
      if (colId === 'totalCost') {
        props.data.totalCost = values?.value;
      }
      if (colId === 'unitCost') {
        props.data.unitCost = values?.value;
      }

      props.api.redrawRows();
      props.api.refreshCells();
    };
    return ['productName', 'clusters'].includes(colId) ? (
      <Field
        linesWrapper
        type={colId === 'clusters' ? 'linesoptions' : 'options'}
        loadOptions={getOptions({
          isFormattedData: colId === 'clusters' ? true : false,

          endPoint:
            colId === 'clusters'
              ? PriceListApis.cluster
              : PriceListApis.product,
          method: 'get',
          params: colId === 'clusters' ? {} : { PageIndex: 1, PageSize: 20 },

          baseURLType: colId === 'clusters' ? 'core' : 'products',
          // key: 'itemGroupId',
          v2: false,
          dataPickFromItems: true,
        })}
        label=""
        value={
          colId === 'clusters' ? props.data.clusters : props.data.productName
        }
        name="componentName"
        onChange={handleChange}
        // largeWrapper
      />
    ) : colId === 'priceListStores.storeName' ? (
      <Field
        linesWrapper
        type="multicheckbox"
        componentName="list"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(event: any) => {
          props.data.priceListStores = [];
          const id = event.map(
            (item: { name?: string; id?: string }, index: number) => {
              return (props.data.priceListStores[index] = {
                storeId: item.id,
                storeName: item.name,
              });
            },
          );
          setStoreList(id);
        }}
        isMulti
        loadOptions={getMultiOptions}
      />
    ) : (
      <AgGridSelectEditor
        handleChange={handleChange}
        data={props?.values ?? []}
        largeWrapper={false}
      />
    );
  };

  const onCellValueChanged = (props: CellValueChangedEvent) => {
    const { data } = props || {};
    props.data.totalCost = Number(data?.unitCost) * Number(data?.quantity) ?? 0;
    props.api.redrawRows();
    props.api.refreshCells();
  };
  const auth = useAuth();

  const getMultiOptions = async () => {
    let options = [];
    const response = await getLineMethod(
      {
        url: `${PriceListApis.getStore}`,
        baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
      },
      auth,
    );

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
  };
};
