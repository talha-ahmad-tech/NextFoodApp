import { useEffect, useState } from 'react';
import TabsHeader from '@fridayfood/shared/components/TabsDetail/TabsHeader';
import FormFooterActions from '@fridayfood/shared/components/FromFooterAction';
import { RenderStepContent } from './Steps';
import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
import { tabsConfiguration } from '../config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PRODUCTS_DEAL_DETAILS } from '../types';
import { useCreateUpdateDealListMutation } from 'services/modules/productsdeal.api';
import { useProductDealLinesHook } from '../productDealLinesHook';
import { useRouter } from 'next/router';
import { alertService, getQueryParam } from '@fridayfood/shared/components';
import { defDate } from '@/utils/helper';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { setComponentName } from '../productsdeal.slice';
import { useDispatch } from 'react-redux';

const steps = ['General', 'Deal Insight'];

const FormFormEnhancer = (props?: PRODUCTS_DEAL_DETAILS) => {
  const dispatch = useDispatch();
  const modify = props?.dealModifiers || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { name = '', dealModifierValues = [] }: any = modify[0] || {};

  const modifiersTitle =
    modify?.length > 1
      ? ` ${
          name
            ? name
            : dealModifierValues[0]?.name
            ? dealModifierValues[0]?.name
            : ''
        } +${modify?.length - 1}`
      : name || '';

  const defaultDeals = {
    tax: props?.dealTaxes,
    modifiersDetail: modify,
    modifiersTitle: modifiersTitle?.length ? modifiersTitle : 'Add Modifiers',

    itemGroupId: props?.itemGroup?.name as string,
    itemGroupDetail: Number(props?.itemGroup?.id),
    items: props?.itemGroup?.name as string,

    categoryId: props?.category?.name,
    categoryName: props?.category?.name,

    categoryDetail: Number(props?.category?.id),

    purchaseUom: props?.purchaseUom,
    saleUom: props?.saleUom,
    purchaseUomName: props?.purchaseUom,
    saleUomName: props?.saleUom,
    purchaseUomDetail: props?.purchaseUomId,
    saleUomDetail: props?.saleUomId,
  };

  const { lines, setLines, dealTypeEnum } = useProductDealLinesHook();
  const tabs = getQueryParam('tabs');

  const [activeStep, setActiveStep] = useState(Number(tabs));
  const [createUpdateDeal] = useCreateUpdateDealListMutation();
  const router = useRouter();
  const isLastStep = activeStep === steps.length - 1;
  const formProps = useForm<PRODUCTS_DEAL_DETAILS>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: props?.id
      ? defaultDeals
      : { ...formInitialValues, code: props?.code, productId: props?.code },
  });

  // const taxes: [] = props?.dealTaxes || [];
  useEffect(() => {
    if (props?.id) {
      formProps?.setValue('id', props?.id ? props?.id : 0);
      formProps.setValue('code', props?.code);
      formProps.setValue('imageUrl', props?.imageUrl);
      formProps.setValue('productId', props?.code ?? 'Product Id');
      formProps.setValue('productName', props?.name);
      dispatch(setComponentName(props?.name || ''));

      formProps.setValue('description', props?.description);
      // formProps.setValue('categoryId', props?.category?.name);
      // formProps.setValue('categoryDetail', Number(props?.category?.id));
      // formProps.setValue('itemGroupId', props?.itemGroup?.name as string);
      // formProps.setValue('itemGroupDetail', Number(props?.itemGroup?.id));
      // formProps.setValue('purchaseUom', props?.purchaseUom);
      // formProps.setValue('saleUom', props?.saleUom);
      // formProps.setValue('purchaseUomName', props?.purchaseUom);
      // formProps.setValue('saleUomName', props?.saleUom);
      // formProps.setValue('purchaseUomDetail', props?.purchaseUomId);
      // formProps.setValue('saleUomDetail', props?.saleUomId);
      formProps.setValue('cost', props?.cost);
      formProps.setValue('inStorePrice', props?.inStorePrice);
      formProps.setValue('collectionPrice', props?.collectionPrice);
      formProps.setValue('deliveryPrice', props?.deliveryPrice);
      formProps.setValue('position', props?.position);
      formProps.setValue('preparationTime', props?.preparationTime);
      formProps.setValue('active', props?.active);
      formProps.setValue('featuredProduct', props?.featuredProduct);

      formProps.setValue('dealInStorePrice', props?.dealDetail?.inStorePrice);
      formProps.setValue(
        'dealCollectionPrice',
        props?.dealDetail?.collectionPrice,
      );
      formProps.setValue('dealDeliveryPrice', props?.dealDetail?.deliveyPrice);
      formProps.setValue(
        'enableDiscount',
        props?.enableProduct || props?.enableDiscount,
      );
      formProps.setValue('enableProduct', props?.enableProduct);
      formProps.setValue('tenantId', null);

      formProps.setValue('startTime', defDate(props?.dealDetail?.startTime));
      formProps.setValue('endTime', defDate(props?.dealDetail?.endTime));

      const detailsLines = props?.dealDetail?.dealDetailComponents?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => {
          const productId = item?.productId ? 1 : 0;
          const packagingMaterialId = item?.packagingMaterialId ? 2 : 0;
          const componentsType = productId ? productId : packagingMaterialId;
          const componentTypeUrl =
            componentsType === 1
              ? '/api/app/products/finished-lookup'
              : '/api/app/ingredient/deal-lookup?type=2';
          return {
            ...item,
            cost: item?.componentCost,
            name: item?.componentName,
            id: Number(item?.id),
            dealDetailId: Number(props?.dealDetail?.id),
            componentTypeValue: dealTypeEnum(
              productId ? productId : packagingMaterialId,
            ),
            productId: item?.productId ? item?.productId : null,
            packagingMaterialId: item?.packagingMaterialId
              ? item?.packagingMaterialId
              : null,
            componentTypeUrl,
            componentType: componentsType,
          };
        },
      );

      const total = detailsLines?.reduce(
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
        { cost: 0, salePrice: 0, tax: 0, quantity: 0, componentCost: 0 },
      );

      setLines({
        ...lines,
        recipesLines: detailsLines,
        cost: {
          cost: total?.cost ?? 0,
          totalCost: total?.cost ?? 0,
          quantity: total?.quantity,
          tax: total?.tax,
          salePrice: total?.salePrice,
          deliveryCost: total?.cost,
          collectionCost: total?.cost,
          eatInCost: total?.cost,
        },
      });
    }
  }, []);

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const _handleSubmit = async (values?: PRODUCTS_DEAL_DETAILS) => {
    const {
      active,
      featuredProduct,
      productId,
      productName,
      description,
      categoryDetail,
      productType,
      preparationTime,
      itemGroupDetail,

      saleUomDetail,
      saleUomName,
      inStorePrice,
      cost,
      deliveryPrice,
      collectionPrice,
      position,
      startTime,
      endTime,
      id,
      enableDiscount,
      enableProduct,
      imageUrl,
    }: PRODUCTS_DEAL_DETAILS = { ...values };
    const payload = {
      imageUrl,
      id: id ? Number(id) : 0,
      productType,
      code: productId,
      name: productName,
      description,
      categoryId: Number(categoryDetail),
      itemGroupId: itemGroupDetail,
      saleUomId: saleUomDetail,
      saleUom: saleUomName,
      cost: Number(cost),
      inStorePrice: Number(inStorePrice),
      collectionPrice: Number(collectionPrice),
      deliveryPrice: Number(deliveryPrice),
      position: Number(position),
      preparationTime: Number(preparationTime),
      active,
      featuredProduct,
      enableProduct: enableDiscount || enableProduct,
      enableDiscount,
      tenantId: null,
      dealModifiers: lines?.productModifiers?.length
        ? lines?.productModifiers
        : props?.dealModifiers,
      externalId: '',
      // dealTaxes: tax,
      dealDetail: {
        id: 0,
        externalId: 'string',
        startTime: startTime,
        endTime: endTime,
        inStorePrice: 0,
        deliveyPrice: 0,
        collectionPrice: 0,
        dealDetailComponents: lines?.recipesLines,
      },
      dealPrices: lines?.priceRowData,
      dealDetailId: props?.dealDetailId ? props?.dealDetailId : 0,
    };

    if (!isLastStep) {
      setActiveStep(activeStep + 1);
    } else {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await createUpdateDeal(payload);

      if (response.data) {
        router.push(
          `/menumanagement/products/deals/${response?.data?.id ?? ''}`,
        );
        alertService.success(id ? 'Updated!' : 'Created', {
          keepAfterRouteChange: true,
          autoClose: true,
        });
      }
    }
  };

  return (
    <div className="friday-vertical-tabs-container">
      <form onSubmit={formProps.handleSubmit(_handleSubmit)}>
        <div className="custom-tabs-wrapper custom-flex-start p-0 ">
          <div className="me-4">
            <TabsHeader
              Tabs={tabsConfiguration({ totalCost: 'asdasd' })}
              activeIndex={activeStep}
            />
          </div>
          <div className="w-100 mb-4">
            <RenderStepContent step={activeStep} formData={formProps} />
          </div>
          <FormFooterActions
            activeStep={activeStep}
            handleBack={_handleBack}
            isLastStep={isLastStep}
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
