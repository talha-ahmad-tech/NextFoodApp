/* eslint-disable react-hooks/rules-of-hooks */
import React, { LegacyRef, useContext, useRef, useState } from 'react';
import {
  ToggleContext,
  ToggleDispatchContext,
} from '@fridayfood/shared/components/Context/ToggleContext';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields';
import type {
  CellValueChangedEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import {
  useGetOptions,
  useSelectionGetter,
} from '@/utils/customHooks/useGetOtions';
import { UomApis } from 'services/modules/uom.api';
import { getMethod } from 'services/axios';
import { AgGridReact } from 'ag-grid-react';
import ModifierSwitch from './modifierSwitch';
import { StoresApis } from 'services/modules/stores.api';
import {
  ProductsContext,
  ProductsDispatchContext,
} from '@fridayfood/shared/components';
import { ActiveIndexContext } from '@fridayfood/shared/components/Context/ProductsContext';
import { useFetchTaxByIdQuery } from 'services/modules/tax.api';
import { ModifierButton } from '../../CustomButton/Modifier';
import FileUploader from 'components/FileUploader';

interface IChange {
  name?: string;
  label?: string;
  value?: string;
  id?: number | string;
  description?: string;
}

export const useModifier = () => {
  const [hide, setHide] = useState(true);

  const storesOptions = useSelectionGetter({
    isFormattedData: true,
    endPoint: StoresApis.taxLookup,
    method: 'get',
    key: 'tax',
    fieldsToShow: ['name'],
    simpleOptions: true,
    dataPickFromItems: true,
    baseURLType: 'core',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridRef: LegacyRef<AgGridReact<any>> | undefined = useRef(null);
  const [refs, setRefs] = useState(gridRef);
  const { getOptions } = useGetOptions();
  const activeTab = useContext(ToggleContext);
  const setActiveTab = useContext(ToggleDispatchContext);
  const lines = useContext(ProductsContext);
  const { activeIndex, setActiveIndex } = useContext(ActiveIndexContext);
  const setLines = useContext(ProductsDispatchContext);

  const updatedRows = [...lines.detailsLines];
  const modifierValue = {
    id: 0,
    name: '',
    modifierId: 0,
    purchaseUomId: 0,
    saleUomId: 0,
    modifierSubValues: [],
    position: 0,
    cost: 0,
    inStorePrice: 0,
    deliveryPrice: 0,
    active: false,
    trackInventory: false,
    nested: false,
    attachment: '',
    isChecked: false,
    modifierValueTaxes: [],
  };

  const addNewValue = () => {
    const toSetRow = {
      ...modifierValue,
      modifierSubValues: [],
    };
    updatedRows.push(toSetRow);
    setLines({ ...lines, detailsLines: updatedRows });
  };

  const deleteValue = () => {
    let newRowData = [...lines?.detailsLines];
    newRowData = newRowData.filter(item => !item.isChecked);
    setLines({ detailsLines: newRowData });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomCellEditorParams = (props: ICellRendererParams | any) => {
    const colId = props.colDef?.field || '';
    const handleChange = (values: IChange) => {
      if (colId === 'purchaseUom') {
        props.data.purchaseUomId = values;
        props.data.purchaseUom = values.name;
      }
      if (colId === 'saleUom') {
        props.data.saleUomId = values.name;
        props.data.saleUom = values.name;
      }
      if (colId === 'modifierValueTax') {
        props.data.modifierValueTaxes = [values];
        props.data.modifierValueTax = values.name;
      }
      props.api.redrawRows();
      props.api.refreshCells();
    };
    return colId === 'modifierValueTax' ? (
      <Field
        isFullWidth={true}
        linesWrapper
        type="multiselect"
        componentType="list"
        isFormattedData={true}
        options={storesOptions}
        label=""
        name="name"
        onChange={handleChange}
      />
    ) : colId === 'attachment' ? (
      <div className="d-flex flex-row">
        <div className="">
          <FileUploader
            type="file"
            isFullwidth
            // value={props?.attachment?.value as string}
            resourceType="1"
            appType="products"
            endPoint="file-handler/upload-resource"
            changeUrl={async (value: string) => {
              props.data.attachment = await value;
            }}
            name={'attachment'}
            label={''}
          />
        </div>
      </div>
    ) : (
      <Field
        linesWrapper
        type="options"
        loadOptions={getOptions({
          endPoint: UomApis.LookUp,
          method: 'get',
          key: 'itemGroupId',
          fieldsToShow: ['name'],
          dataPickFromItems: true,
          baseURLType: 'products',
          // simpleOptions:true,
          isFormattedData: false,
        })}
        label=""
        name="name"
        onChange={handleChange}
      />
    );
  };

  const onCellValueChanged = (props: CellValueChangedEvent) => {
    // const { data } = props || {};
    // const colId = props?.colDef.field || '';
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

  const columnDefs = (
    CustomCellEditorParams?: (props: ICellRendererParams) => JSX.Element,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setShow?: any,
  ) => {
    return [
      {
        headerName: '#',
        field: 'all',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        maxWidth: 49,
      },
      {
        headerName: 'Name',
        field: 'name',
        editable: true,
        resizable: true,
      },
      {
        headerName: 'Purchase UOM',
        field: 'purchaseUom',
        editable: true,
        cellEditor: CustomCellEditorParams,
        cellRenderer: ({ data }: ICellRendererParams) => {
          return data.purchaseUom ? data.purchaseUom : data.purchaseUomId;
        },
        cellEditorPopup: true,
        filter: false,
      },
      {
        headerName: 'Sale UOM',
        field: 'saleUom',
        editable: true,
        cellEditor: CustomCellEditorParams,
        cellRenderer: ({ data }: ICellRendererParams) => {
          return data.saleUom ? data.saleUom : data.saleUomId;
        },
        cellEditorPopup: true,
        filter: false,
      },
      {
        headerName: 'Positon',
        field: 'position',
        editable: true,
        sortable: true,
        resizable: true,
      },

      {
        headerName: 'Cost',
        field: 'cost',
        editable: true,
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'Tax ID',
        field: 'modifierValueTax',
        cellEditor: CustomCellEditorParams,
        cellRenderer: ({ data }: ICellRendererParams) => {
          const { currentData } = useFetchTaxByIdQuery(
            data.modifierValueTaxes[0]?.id,
            {
              skip: data.modifierValueTaxes.length === 0,
            },
          );
          return data?.modifierValueTax
            ? data?.modifierValueTax
            : currentData?.name;
        },
        cellEditorPopup: true,
        editable: true,
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'Tax',
        field: 'tax',
        cellRenderer: ({ data }: ICellRendererParams) => {
          const { currentData } = useFetchTaxByIdQuery(
            data.modifierValueTaxes[0]?.id,
            {
              skip: data.modifierValueTaxes.length === 0,
            },
          );
          return data.modifierValueTaxes[0]?.id ? currentData?.taxRate : '-';
        },
        sortable: true,
        resizable: true,
      },

      {
        headerName: 'In-Store Price',
        field: 'inStorePrice',
        editable: true,
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'Delivery Price',
        field: 'deliveryPrice',
        editable: true,
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'Active',
        field: 'active',
        cellRenderer: ModifierSwitch,
      },
      {
        headerName: 'Track Inventory',
        field: 'trackInventoty',
        cellRenderer: ModifierSwitch,
      },
      {
        headerName: 'Nested',
        field: 'nested',
        cellRendererFramework: (params: ICellRendererParams) => {
          if (params?.data?.nested) {
            setHide(false);
          }
          return ModifierSwitch(params, setHide, setShow, setActiveIndex);
        },
      },
      {
        headerName: 'Modifier Sub Value',
        field: 'modifierSubValues',
        sortable: true,
        filter: 'agTextColumnFilter',
        resizable: true,
        cellRendererFramework: (params: ICellRendererParams) => {
          if (lines?.subValues?.length > 0) {
            params.data.modifierSubValues = lines.subValues[params?.rowIndex];
          }
          const values = params?.data?.modifierSubValues?.map(
            (item: { name: string; value: string | number }) => {
              return { name: item?.name ?? item?.value };
            },
          );

          return values?.length > 0 ? (
            ModifierButton(values || [])
          ) : (
            <span>-</span>
          );
        },
        // cellRenderer: (params: ICellRendererParams) => {
        //   if (lines?.subValues?.length > 0) {
        //     params.data.modifierSubValues = lines.subValues[params?.rowIndex];
        //   }

        //   return params.data?.modifierSubValues?.length > 0
        //     ? `${
        //         params.data?.modifierSubValues[0]?.value
        //           ? params.data?.modifierSubValues[0]?.value
        //           : params.data?.modifierSubValues[0]?.name
        //       } ${
        //         params.data.modifierSubValues?.length > 1
        //           ? `+${params.data.modifierSubValues?.length - 1}`
        //           : ''
        //       }`
        //     : '';
        // },
        hide: hide,
        filterParams: {
          buttons: ['reset'],
        },
      },
      {
        headerName: 'Image',
        field: 'attachment',
        editable: true,
        cellEditor: CustomCellEditorParams,
      },
    ];
  };

  return {
    onCellValueChanged,
    CustomCellEditorParams,
    activeTab,
    setActiveTab,
    getMultiOptions,
    gridRef,
    refs,
    setRefs,
    columnDefs,
    addNewValue,
    deleteValue,
    activeIndex,
  };
};
