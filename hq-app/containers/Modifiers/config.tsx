/* eslint-disable react-hooks/rules-of-hooks */
import { MODIFIER_DETAILS } from './types';
import type { ICellRendererParams } from 'ag-grid-community';
import { useFetchUOMDetailsQuery } from 'services/modules/uom.api';
import { useFetchTaxByIdQuery } from 'services/modules/tax.api';
import { ModifierButton } from './CustomButton/Modifier';

export const tabsConfiguration = ({
  name = '',
  description = '',
  position = '',
  compulsory = false,
  modifierValues = [],
  maxSelectionAllowed = '',
}: MODIFIER_DETAILS) => {
  return [
    {
      id: 'modifiers',
      label: 'Recipes',
      classes: 'active',
      actions: true,
      type: 'custom',
      topTableData: [
        { name: 'Name', value: name },
        { name: 'Description', value: description },
        { name: 'Position', value: position },
        { name: 'compulsory', value: compulsory ? 'Yes' : 'No' },
        { name: 'Optional', value: compulsory ? 'No' : 'Yes' },
        { name: 'Max Selection Allowed', value: maxSelectionAllowed },
      ],
      TitlecolumnDef1: 'Modifier Values',
      dataRows: modifierValues,
      columnDef1: [
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
          filter: false,
        },
        {
          headerName: 'Purchase UOM',
          field: 'purchaseUomId',
          cellRenderer: ({ data }: ICellRendererParams) => {
            const { currentData } = useFetchUOMDetailsQuery(
              data?.purchaseUomId,
              {
                skip:
                  data?.purchaseUomId === null ||
                  data?.purchaseUomId === undefined,
              },
            );
            return data?.purchaseUomId ? currentData?.name : '-';
          },
          filter: false,
        },
        {
          headerName: 'Sale UOM',
          field: 'saleUomId ',
          cellRenderer: ({ data }: ICellRendererParams) => {
            const { currentData } = useFetchUOMDetailsQuery(data?.saleUomId, {
              skip: data?.saleUomId === null || data?.saleUomId === undefined,
            });
            return data?.saleUomId ? currentData?.name : '-';
          },
          filter: false,
        },
        {
          headerName: 'Position',
          field: 'position',
          filter: false,
        },
        {
          headerName: 'Cost',
          field: 'cost',
          filter: false,
        },
        {
          headerName: 'Tax ID',
          field: 'modifierValueTaxes',
          cellRenderer: ({ data }: ICellRendererParams) => {
            const { currentData } = useFetchTaxByIdQuery(
              data.modifierValueTaxes[0]?.taxId,
              {
                skip: data.modifierValueTaxes.length === 0,
              },
            );
            return data.modifierValueTaxes[0]?.taxId // NO TaxID name found
              ? currentData?.name
              : '-';
          },
          filter: false,
        },
        {
          headerName: 'Tax',
          field: 'modifierValueTaxes',
          cellRenderer: ({ data }: ICellRendererParams) => {
            const { currentData } = useFetchTaxByIdQuery(
              data.modifierValueTaxes[0]?.taxId,
              {
                skip: data.modifierValueTaxes.length === 0,
              },
            );
            return data.modifierValueTaxes[0]?.id // NO Tax found
              ? currentData?.taxRate
              : '-';
          },
          filter: false,
        },

        {
          headerName: 'In-Store Price',
          field: 'inStorePrice',
          filter: false,
        },

        {
          headerName: 'Delivery Price',
          field: 'deliveryPrice',
          filter: false,
        },
        {
          headerName: 'Active',
          field: 'active',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data.active === true ? 'Yes' : 'No';
          },
        },
        {
          headerName: 'Track Inventory',
          field: 'trackInventoty',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data.trackInventoty === true ? 'Yes' : 'No';
          },
        },
        {
          headerName: 'Nested',
          field: 'nested',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data.trackInventoty === true ? 'Yes' : 'No';
          },
        },
        {
          headerName: 'Modifier Sub Value',
          field: 'modifierSubValues',
          cellRendererFramework: ({ data }: ICellRendererParams) => {
            const values = data?.modifierSubValues?.map(
              (s: { name: string }) => {
                return { name: s?.name };
              },
            );

            return values?.length > 0 ? (
              ModifierButton(values || [])
            ) : (
              <span>-</span>
            );
          },
          // cellRenderer: ({ data }: ICellRendererParams) => {
          //   return data?.modifierSubValues?.length > 0
          //     ? `${
          //         data?.modifierSubValues[0]?.value
          //           ? data?.modifierSubValues[0]?.value
          //           : data?.modifierSubValues[0]?.name
          //       } ${
          //         data.modifierSubValues?.length > 1
          //           ? `+${data.modifierSubValues?.length - 1}`
          //           : ''
          //       }`
          //     : '';
          // },
        },
      ],
      image: {},
    },
  ];
};
