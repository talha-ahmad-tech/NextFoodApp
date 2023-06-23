import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { Field } from '@fridayfood/ui-toolkit';
import { forwardRef, memo, useContext, useState } from 'react';
import type { CellValueChangedEvent } from 'ag-grid-community';
import { productsEndpoints } from 'services/modules/products.api';
import {
  AgGridSelectEditor,
  ProductsContext,
  ProductsDispatchContext,
} from '@fridayfood/shared/components';
import { urlConverter } from '@/utils/helper';
import { useAuth } from 'oidc-react';
import axios from 'axios';
interface ITempValues {
  name?: string;
  value: number | string;
  label?: string;
  cost?: number;
  id?: number;
}
export const useProductDealLinesHook = () => {
  const { getOptions } = useGetOptions();
  const auth = useAuth();

  const [component, setComponent] = useState<string[]>([]);

  const fetchOptions = async (url?: string) => {
    const preUrl = urlConverter('products') + url;
    const res = await axios({
      method: 'get', //you can set what request you want to be
      url: preUrl,
      headers: {
        Authorization: 'Bearer ' + auth.userData?.access_token,
      },
    });
    if (res.status === 200) {
      const result = res.data?.length
        ? res.data?.map((items: { name: string; id: number }) => ({
            ...items,
            label: items?.name,
            value: items?.id,
          }))
        : [];
      setComponent(result);
    } else {
      setComponent([]);
    }
  };

  const lines = useContext(ProductsContext);
  const setLines = useContext(ProductsDispatchContext);

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
  const componentStatusEnum = (value: number) => {
    switch (value) {
      case 0:
        return '-';
      case 1:
        return 'Compulsory';
      case 2:
        return 'Optional';
      default:
        break;
    }
  };

  const CustomCellEditorParamsForRecipes = memo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    forwardRef((props: any) => {
      const colId = props?.column?.colDef?.field;
      const handleChange = (values: ITempValues) => {
        if (colId === 'componentTypeValue') {
          if (colId === 'componentTypeValue') {
            props.data.componentType = values?.value;
            props.data.componentTypeValue = values?.label;
            props.data.componentTypeUrl = `/api/app/ingredient/deal-lookup?type=${
              values?.value || props?.data?.componenetType
            }`;

            props.data.componentStatus =
              values?.value || props?.data?.componenetType;

            props.data.componentStatusValue =
              [1, 2].includes(Number(values?.value)) ||
              [1, 2].includes(props?.data?.componenetType)
                ? 'Compulsary'
                : '';
          }

          fetchOptions(
            props?.data?.componentTypeUrl ??
              productsEndpoints?.ingredientDropdown(props?.data?.componentType),
          );
        }
        if (colId === 'cost') {
          props.data.cost = values?.value;
        }
        if (colId === 'componentStatusValue') {
          props.data.componentStatusValue = values?.label;
          props.data.componentStatus = values?.label;
        }
        if (colId === 'name') {
          if (
            props.data.componentTypeValue === 'Ingredient' ||
            props.data?.componentTypeValue === 'PackagingMaterial'
          ) {
            props.data.ingredientId = values?.id;
          } else {
            props.data.modifierValueId = values?.id;
          }

          props.data.name = values?.label;
          props.data.unitCost = values?.cost ?? 0;
        }
        if (colId === 'quantity') {
          props.data.quantity = values?.value;
        }
        if (colId === 'sellingUom') {
          props.data.sellingUom = values?.name;
        }
        if (colId === 'totalCost') {
          props.data.totalCost = values?.value;
        }
        if (colId === 'unitCost') {
          props.data.unitCost = values?.value ?? 0;
        }
        props.api.redrawRows();
        props.api.refreshCells();
      };

      return colId === 'componentTypeValue' ||
        colId === 'componentStatusValue' ||
        colId === 'name' ? (
        <AgGridSelectEditor
          handleChange={handleChange}
          data={colId === 'name' ? component : props?.values}
          largeWrapper={false}
        />
      ) : (
        <Field
          linesWrapper
          type="options"
          loadOptions={getOptions({
            paramsKey:
              props?.data?.props?.data?.componentTypeUrl ??
              props?.data?.componentType,
            endPoint: productsEndpoints?.uomDropdown,
            method: 'get',
            key: 'itemGroupId',
            fieldsToShow: ['name'],
            dataPickFromItems: true,
            baseURLType: 'products',
          })}
          label=" "
          name="componentName"
          onChange={handleChange}
        />
      );
    }),
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCellValueChangedForRecipes = (props: CellValueChangedEvent | any) => {
    const { data } = props || {};
    props.data.totalCost = Number(data?.unitCost) * Number(data?.quantity) ?? 0;

    const total = lines?.recipesLines?.reduce(
      (pre: number, current: { totalCost: number }) => {
        pre += current?.totalCost;
        return pre;
      },
      0,
    );
    setLines({
      ...lines,
      cost: {
        deliveryCost: total,
        collectionCost: total,
        eatInCost: total,
      },
    });
    props.api.redrawRows();
    props.api.refreshCells();
  };
  return {
    onCellValueChangedForRecipes,
    CustomCellEditorParamsForRecipes,
    lines,
    setLines,
    componentStatusEnum,
    componentTypeEnum,
  };
};
