import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { Field } from '@fridayfood/ui-toolkit';
import { useContext } from 'react';
import type { CellValueChangedEvent } from 'ag-grid-community';
import { productsEndpoints } from 'services/modules/products.api';
import {
  AgGridSelectEditor,
  ProductsContext,
  ProductsDispatchContext,
} from '@fridayfood/shared/components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { IState } from './productsdeal.slice';
import { RootState } from '@/lib/store';
import { useAuth } from 'oidc-react';
import { urlConverter } from '@/utils/helper';
import axios from 'axios';
interface ITempValues {
  name?: string;
  value: number | string;
  label?: string;
  cost?: number;
  code?: string;
  externalId?: string;
  productId?: string;
  tax?: string;
  salePrice?: string;
}
export const useProductDealLinesHook = () => {
  const lines = useContext(ProductsContext);
  const setLines = useContext(ProductsDispatchContext);
  const auth = useAuth();

  // const [component, setComponent] = useState({ products: [], ingredients: [] });

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
      // setComponent({
      //   ...component,
      //   ingredients: url?.includes('ingredient') ? result : [],
      //   products: url?.includes('products') ? result : [],
      // });
      return result;
    } else {
      // setComponent({ ...component });
      return [];
    }
  };

  const router = useRouter();
  const { id: currentDealId = 0 } = router?.query;

  const dealTypeEnum = (value: number) => {
    switch (value) {
      case 1:
        return 'Finished Product';
      case 2:
        return 'Packaging Material';
      case 3:
        return 'Modifier';
      default:
        break;
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
  const { componentName }: IState = useSelector(
    (state: RootState) => state.productsdealReducer,
  );
  const { getOptions } = useGetOptions();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomCellEditorParamsForRecipes = (props?: any) => {
    const colId = props?.column?.colDef?.field;
    const handleChange = (values: ITempValues) => {
      if (colId === 'componentTypeValue') {
        props.data.componentType = values?.value;
        props.data.componentTypeValue = values?.label;
      }
      if (colId === 'cost') {
        props.data.cost = values?.value;
        props.data.componentCost = values?.value;
      }
      if (colId === 'componentStatusValue') {
        props.data.componentStatusValue = values?.label;
        props.data.componentStatus = values?.value;
      }
      if (colId === 'name') {
        props.data.name = values?.label;
        props.data.componentName = values?.label;
        props.data.cost = Number(values?.cost) ?? 0;
        props.data.code = values?.code;
        props.data.componentCost = Number(values?.cost) ?? 0;

        props.data.tax = Number(values?.tax);
        props.data.salePrice = Number(values?.salePrice);
        props.data.packagingMaterialId =
          props?.data?.componentType === 2 ? values?.value : null;
        props.data.productId =
          props?.data?.componentType === 1 ? values?.value : null;

        const devider = props?.data?.salePrice - props?.data?.tax;
        let grossProfit: number =
          devider > 0 ? 1 - props?.data?.cost / devider : 0;
        grossProfit = grossProfit ? Number(Math.floor(grossProfit * 100)) : 0;

        let grossMargin =
          Number(props?.data?.salePrice ?? 0) -
          Number(props?.data?.tax ?? 0) -
          Number(props?.data?.cost ?? 0);

        grossMargin = grossMargin ? Number(grossMargin) : 0;

        props.data.grossProfit = grossProfit ?? 0;
        props.data.grossMargin = grossMargin;

        props.api.redrawRows();
        props.api.refreshCells();
      }

      if (colId === 'quantity') {
        props.data.quantity = Number(values?.value);
      }
      if (colId === 'sellingUom') {
        props.data.sellingUom = values?.name;
      }
      if (colId === 'totalCost') {
        props.data.totalCost = values?.value;
      }
      if (colId === 'cost') {
        props.data.cost = Number(values?.value);
      }
      props.api.redrawRows();
      props.api.refreshCells();
    };

    if (!props?.isNotPinned) {
      return <div>{props?.value}</div>;
    } else {
      return colId === 'componentTypeValue' ||
        colId === 'componentStatusValue' ||
        colId === 'name' ? (
        <AgGridSelectEditor
          handleChange={handleChange}
          data={props?.values}
          largeWrapper={false}
        />
      ) : null;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomCellEditorParamsForDeal = (props: any) => {
    // const colId = props?.column?.colDef?.field;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (values: any) => {
      props.data.componentName = values?.name;
      props.data.productId = values?.id;
      props.data.componentCost = values?.cost;
      props.api.redrawRows();
      props.api.refreshCells();
    };

    return (
      <Field
        linesWrapper
        type="options"
        loadOptions={getOptions({
          endPoint: productsEndpoints?.productsDropdown,
          method: 'get',
          key: 'products',
          fieldsToShow: ['name'],
          dataPickFromItems: true,
          baseURLType: 'products',
        })}
        label=" "
        name="componentName"
        onChange={handleChange}
      />
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCellValueChangedForStore = (props?: CellValueChangedEvent | any) => {
    const { data } = props || {};
    props.data.salePrice = Number(data?.salePrice);

    props.data.profit =
      Number(data?.salePrice ?? 0) -
      Number(data?.costPrice) -
      Number(lines?.cost?.tax);

    const diff = data?.salePrice - lines?.cost?.tax;
    props.data.inTakeMargin = diff > 0 ? 1 - data?.costPrice / diff : 0;
    props.data.tax = Number(lines?.cost?.tax) ?? 0;

    props.api.redrawRows();
    props.api.refreshCells();
  };

  const onCellValueChangedForDelivery = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props?: CellValueChangedEvent | any,
  ) => {
    const { data } = props || {};
    props.data.salePrice = Number(data?.salePrice);
    props.data.profit =
      Number(data?.salePrice ?? 0) -
      Number(data?.costPrice) -
      Number(lines?.cost?.tax);

    props.data.tax = Number(lines?.cost?.tax) ?? 0;

    const diff = data?.salePrice - lines?.cost?.tax;
    props.data.inTakeMargin = diff > 0 ? 1 - data?.costPrice / diff : 0;

    props.api.redrawRows();
    props.api.refreshCells();
  };

  const onCellValueChangedForCollection = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props?: CellValueChangedEvent | any,
  ) => {
    const { data } = props || {};
    props.data.salePrice = Number(data?.salePrice);
    props.data.profit =
      Number(data?.salePrice ?? 0) -
      Number(data?.costPrice) -
      Number(lines?.cost?.tax);

    const diff = data?.salePrice - lines?.cost?.tax;
    props.data.inTakeMargin = diff > 0 ? 1 - data?.costPrice / diff : 0;
    props.data.tax = Number(lines?.cost?.tax) ?? 0;
    props.api.redrawRows();
    props.api.refreshCells();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCellValueChangedForRecipes = (props: CellValueChangedEvent | any) => {
    const { data } = props || {};
    props.data.totalCost = Number(data?.cost);
    props.data.cost = Number(data?.cost);
    props.data.componentCost = Number(data?.cost);
    props.data.quantity = Number(data?.quantity);
    props.data.salePrice = Number(data?.salePrice);
    props.data.tax = Number(data?.tax);

    const devider = data?.salePrice - data?.tax;
    let grossProfit: number = devider > 0 ? 1 - data?.cost / devider : 0;
    grossProfit = grossProfit ? Number(Math.floor(grossProfit * 100)) : 0;

    let grossMargin =
      Number(data?.salePrice ?? 0) -
      Number(data?.tax ?? 0) -
      Number(data?.cost ?? 0);

    grossMargin = grossMargin ? Number(grossMargin) : 0;

    props.data.grossProfit = grossProfit ?? 0;
    props.data.grossMargin = grossMargin;

    const total = lines?.recipesLines?.reduce(
      (
        pre: {
          totalCost: number;
          cost: number;
          tax: number;
          salePrice: number;
          quantity: number;
        },
        cr: {
          totalCost: number;
          cost: number;
          tax: number;
          salePrice: number;
          quantity: number;
        },
      ) => {
        return {
          cost: Number(pre.cost) + Number(cr.cost),
          tax: Number(pre.tax) + Number(cr.tax),
          salePrice: Number(pre.salePrice) + Number(cr.salePrice),
          quantity: Number(pre.quantity) + Number(cr.quantity),
        };
      },
      { cost: 0, salePrice: 0, tax: 0, quantity: 0 },
    );

    setLines({
      ...lines,
      cost: {
        quantity: total?.quantity,
        tax: total?.tax,
        salePrice: total?.salePrice,
        deliveryCost: total?.cost,
        collectionCost: total?.cost,
        eatInCost: total?.cost,
      },
    });
    props.api.redrawRows();
    props.api.refreshCells();
  };

  let grossMargin =
    Number(lines?.cost?.salePrice) -
    Number(lines?.cost?.tax) -
    Number(lines?.cost?.totalCost);
  grossMargin = grossMargin ? Number(grossMargin) : 0;

  const difference = Number(lines?.cost?.salePrice) - Number(lines?.cost?.tax);
  let grossProfit: number =
    difference > 0 ? 1 - Number(lines?.cost?.totalCost) / difference : 0;
  const grossProfits =
    Number(Math.floor(grossProfit * 100)) > 0
      ? Number(Math.floor(grossProfit * 100))
      : 0;
  grossProfit = grossProfits ? grossProfits : 0;

  let intakeMarginStore: string | number =
    difference > 0 ? 1 - Number(lines?.cost?.eatInCost) / difference : 0;

  intakeMarginStore = intakeMarginStore
    ? Number(Math.floor(intakeMarginStore * 100))
    : 0;

  let intakeMarginDelivery: string | number =
    difference > 0 ? 1 - Number(lines?.cost?.deliveryCost) / difference : 0;

  intakeMarginDelivery = intakeMarginDelivery
    ? Number(Math.floor(intakeMarginDelivery * 100))
    : 0;

  let intakeMarginCollection: string | number =
    difference > 0 ? 1 - Number(lines?.cost?.collectionCost) / difference : 0;

  intakeMarginCollection = intakeMarginCollection
    ? Number(Math.floor(intakeMarginCollection * 100))
    : 0;

  const storeProfit =
    lines?.cost?.salePrice - lines?.cost?.collectionCost - lines?.cost?.tax;
  const deliveryProfit =
    lines?.cost?.salePrice - lines?.cost?.collectionCost - lines?.cost?.tax;
  const collectionProfit =
    lines?.cost?.salePrice - lines?.cost?.collectionCost - lines?.cost?.tax;

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

  const pinnedBottomRowData = [
    {
      editable: (o: { node: { isRowPinned: () => boolean } }) =>
        !o.node.isRowPinned(),
      componentTypeValue: 'Grand Total',
      quantity: total.quantity,
      cost: total.collectionCost,
      tax: total.tax,
      salePrice: Number(total.salePrice),
      grossMargin,
      grossProfit: grossProfit + '%',
    },
  ];
  const totalProfit = (index: number) => {
    const profitValue =
      index === 0
        ? storeProfit ?? 0
        : index === 1
        ? deliveryProfit ?? 0
        : collectionProfit ?? 0;
    return profitValue;
  };

  const totalIntakeMargin = (index: number) => {
    const marginValue =
      index === 0
        ? intakeMarginStore ?? 0
        : index === 1
        ? intakeMarginDelivery ?? 0
        : intakeMarginCollection ?? 0;
    return marginValue;
  };

  return {
    onCellValueChangedForDelivery,
    onCellValueChangedForStore,
    onCellValueChangedForCollection,

    onCellValueChangedForRecipes,
    CustomCellEditorParamsForDeal,
    CustomCellEditorParamsForRecipes,
    lines,
    setLines,
    componentStatusEnum,
    componentTypeEnum,
    pinnedBottomRowData,
    intakeMarginCollection,
    intakeMarginDelivery,
    intakeMarginStore,
    storeProfit,
    collectionProfit,
    deliveryProfit,
    currentDealId,
    dealTypeEnum,
    componentName,
    totalProfit,
    totalIntakeMargin,
    fetchOptions,
  };
};
