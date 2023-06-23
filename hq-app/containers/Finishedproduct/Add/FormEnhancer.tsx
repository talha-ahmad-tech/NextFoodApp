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
import { FINISHEDPRODUCT_DETAILS } from '../types';
import { useCreateUpdateFinishedProductListMutation } from 'services/modules/finishedproduct.api';
import { useProductDealLinesHook } from '../productDealLinesHook';
import { useRouter } from 'next/router';
import { alertService, getQueryParam } from '@fridayfood/shared/components';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';

const steps = ['General', 'Recipes'];

const FormFormEnhancer = (props?: FINISHEDPRODUCT_DETAILS) => {
  const modify = props?.productModifiers || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { name = '', productModifierValues = [] }: any = modify[0] || {};

  const modifiersTitle =
    modify?.length > 1
      ? ` ${
          name
            ? name
            : productModifierValues[0]?.name
            ? productModifierValues[0]?.name
            : ''
        } +${modify?.length - 1}`
      : name || '';
  const { lines, setLines, componentStatusEnum, componentTypeEnum } =
    useProductDealLinesHook();
  const tabs = getQueryParam('tabs');
  const [activeStep, setActiveStep] = useState(Number(tabs));
  const [createUpdateFinishedProduct] =
    useCreateUpdateFinishedProductListMutation();
  const router = useRouter();
  const isLastStep = activeStep === steps.length - 1;

  const defaultDeals = {
    tax: props?.productTaxes,
    modifiersDetail: props?.productModifiers as string,
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
  const formProps = useForm<FINISHEDPRODUCT_DETAILS>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: props?.id
      ? defaultDeals
      : { ...formInitialValues, productId: props?.code ?? '' },
  });

  const recipeDetails = props?.recipe?.recipeDetails || [];

  useEffect(() => {
    if (props?.id) {
      formProps?.setValue('id', props?.id ? props?.id : 0);
      formProps.setValue('code', props?.code);
      formProps.setValue('productId', props?.code ?? 'Product Id');
      formProps.setValue('productName', props?.name);
      formProps.setValue('description', props?.description);
      formProps.setValue('categoryId', props?.category?.name);
      formProps.setValue('categoryDetail', Number(props?.category?.id));

      formProps.setValue('purchaseUom', props?.purchaseUom);
      formProps.setValue('saleUom', props?.saleUom);
      formProps.setValue('purchaseUomName', props?.purchaseUom);
      formProps.setValue('saleUomName', props?.saleUom);
      formProps.setValue('purchaseUomDetail', props?.purchaseUomId);
      formProps.setValue('saleUomDetail', props?.saleUomId);
      formProps.setValue('cost', props?.cost);
      formProps.setValue('inStorePrice', props?.inStorePrice);
      formProps.setValue('collectionPrice', props?.collectionPrice);
      formProps.setValue('deliveryPrice', props?.deliveryPrice);
      formProps.setValue('position', props?.position);
      formProps.setValue('preparationTime', props?.preparationTime);
      formProps.setValue('active', props?.active);
      formProps.setValue('imageUrl', props?.imageUrl);
      formProps.setValue('productModifiers', props?.productModifiers);
      formProps.setValue('featuredProduct', props?.featuredProduct);

      const modifierDetails = [...(modify as [])]?.map(
        (item: { productModifierValues: [] }) => {
          return item?.productModifierValues.map(
            (details: { [key: string]: string | number | boolean }) => details,
          );
        },
      );
      const newDetails = modifierDetails?.flat(1);

      formProps.setValue(
        'enableDiscount',
        props?.enableProduct || props?.enableDiscount,
      );
      formProps.setValue('enableProduct', props?.enableProduct);
      formProps.setValue('tenantId', null);
      formProps.setValue('recipeType', props.recipe?.recipeType as string);

      // formProps.setValue('tax', props?.productTaxes);
      // // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // formProps.setValue('modifiersDetail', modify as any);
      formProps.setValue(
        'modifiersTitle',
        modifiersTitle?.length ? modifiersTitle : 'Add Modifiers',
      );
      const recipesLines = recipeDetails?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => {
          return {
            ...item,
            componentStatusValue: componentStatusEnum(
              Number(item?.componentStatus),
            ),
            id: Number(item?.id),
            componentTypeValue: componentTypeEnum(Number(item?.componentType)),
            componentStatus: item?.componentStatus,
            componentType: item?.componentType,
          };
        },
      );

      setLines({
        ...lines,
        recipesLines: recipesLines,
        productModifierDetails: newDetails,

        cost: {
          collectionCost: props?.recipe?.collectionCost,
          deliveryCost: props?.recipe?.deliveryCost,
          eatInCost: props?.recipe?.eatInCost,
        },
      });
    }
  }, []);

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const _handleSubmit = async (values?: FINISHEDPRODUCT_DETAILS) => {
    const {
      imageUrl,
      active,
      featuredProduct,
      productId,
      productName,
      description,
      categoryDetail,
      productType,
      preparationTime,
      itemGroupDetail,
      // purchaseUomDetail,
      purchaseUomName,
      saleUomName,
      saleUomDetail,
      inStorePrice,
      // cost,
      deliveryPrice,
      collectionPrice,
      position,
      // modifiers,
      // modifiersDetail,
      tax,
      // uploadImage,
      id,
      enableDiscount,
      enableProduct,
      recipeType,
    }: FINISHEDPRODUCT_DETAILS = { ...values };

    const payload = {
      id: id ? Number(id) : 0,
      imageUrl,
      productType,
      code: productId,
      name: productName,
      description,
      categoryId: Number(categoryDetail),
      itemGroupId: itemGroupDetail,
      saleUom: saleUomName,
      saleUomId: saleUomDetail,
      puchaseUomId: 0, //purchaseUomDetail, remove this field
      purchaseUom: purchaseUomName,
      cost: 0, // remove this field
      inStorePrice: Number(inStorePrice),
      collectionPrice: Number(collectionPrice),
      deliveryPrice: Number(deliveryPrice),
      enableProduct: enableDiscount || enableProduct,
      enableDiscount,
      position,
      preparationTime,
      active,
      featuredProduct,
      tenantId: null,
      productModifiers: lines?.productModifiers?.length
        ? lines?.productModifiers
        : props?.productModifiers,
      productTaxes: tax,
      recipe: {
        recipeType: recipeType,
        id: props?.recipe?.id ? props?.recipe?.id : 0,
        tenantId: null,
        name: 'string',
        collectionCost: lines?.cost?.collectionCost,
        eatInCost: lines?.cost?.eatInCost,
        deliveryCost: lines?.cost?.deliveryCost,
        outputUnit: props?.recipe?.outputUnit
          ? props?.recipe?.outputUnit
          : 'string',
        outputPerBatch: props?.recipe?.outputPerBatch
          ? props?.recipe?.outputPerBatch
          : 0,
        recipeDetails: lines?.recipesLines,
      },
      recipeId: props?.recipeId ? props?.recipeId : '0',
    };
    if (!isLastStep) {
      setActiveStep(activeStep + 1);
    } else {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await createUpdateFinishedProduct(payload);

      if (response.data) {
        router.push(
          `/menumanagement/products/finishedproduct/${
            response?.data?.id ?? ''
          }`,
        );
        alertService.success(props?.id ? 'Updated!' : 'Created', {
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
            <TabsHeader Tabs={tabsConfiguration()} activeIndex={activeStep} />
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
