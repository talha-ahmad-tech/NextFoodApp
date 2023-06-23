import { useEffect, useState } from 'react';
import TabsHeader from '@fridayfood/shared/components/TabsDetail/TabsHeader';
import FormFooterActions from '@fridayfood/shared/components/FromFooterAction';
import { useRouter } from 'next/router';
import { RenderStepContent } from './Steps';
import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
import { tabsConfiguration } from '../config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADD_UPDATE_INGREDIENTS } from '../types';
import { useCreateUpdateIngredientListMutation } from 'services/modules/ingredients.api';
import { alertService } from '@fridayfood/shared/components/Alert';
import type { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const steps = ['General'];

const FormFormEnhancer = ({
  id,
  code,
  active,
  cost,
  description,
  enableDiscount,
  featuredProduct,
  name,
  purchaseUom,
  purchaseUomId,
  saleUomId,
  saleUom,
  productType,
  ingredientTaxes,
  imageUrl,
}: ADD_UPDATE_INGREDIENTS) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [createUpdateIngredients] = useCreateUpdateIngredientListMutation();
  const isLastStep = activeStep === steps.length - 1;
  const formProps = useForm<ADD_UPDATE_INGREDIENTS>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: id
      ? { ingredientTaxes }
      : { ...formInitialValues, productId: code ?? '' },
  });
  useEffect(() => {
    formProps?.setValue('id', id ? id : 0);
    formProps.setValue('code', code);
    formProps.setValue('productId', code ?? 'Product Id');
    formProps.setValue('productName', name);
    formProps.setValue('description', description);
    formProps.setValue('purchaseUom', purchaseUom);
    formProps.setValue('saleUom', saleUom);
    formProps.setValue('purchaseUomName', purchaseUom);
    formProps.setValue('saleUomName', saleUom);
    formProps.setValue('purchaseUomDetail', purchaseUomId);
    formProps.setValue('saleUomDetail', saleUomId);
    formProps.setValue('cost', cost);
    formProps.setValue('imageUrl', imageUrl);

    formProps.setValue('active', active);
    formProps.setValue('featuredProduct', featuredProduct);
    formProps.setValue('enableDiscount', enableDiscount);
    formProps?.setValue('productType', productType ?? 1);
  }, [id]);

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const _handleSubmit = async (values: ADD_UPDATE_INGREDIENTS) => {
    const payload = id
      ? {
          ...values,
          id,
          imageUrl: values?.imageUrl,
          ingredientTaxes: values?.ingredientTaxes,
          code: values?.productId,
          cost: Number(values?.cost),
          name: values?.productName,
          purchaseUom: values?.purchaseUomName,
          saleUom: values?.saleUomName,
          purchaseUomId: values?.purchaseUomDetail,
          saleUomId: values?.saleUomDetail,
          tenantId: null,
        }
      : {
          ...values,
          id: 0,
          imageUrl: values?.imageUrl,
          ingredientTaxes: values?.ingredientTaxes,
          cost: Number(values?.cost),
          name: values?.productName,
          purchaseUom: values?.purchaseUomName,
          saleUom: values?.saleUomName,
          purchaseUomId: values?.purchaseUomDetail,
          saleUomId: values?.saleUomDetail,
          tenantId: null,
          code: values?.productId,
        };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: { [key: string]: string | number };
    } = await createUpdateIngredients(payload);

    if (response.data) {
      router.push(
        `/menumanagement/products/ingredients/${response?.data?.id ?? ''}`,
      );
      alertService.success(id ? 'Updated!' : 'Created', {
        keepAfterRouteChange: true,
        autoClose: true,
      });
    }
  };
  return (
    <div className="friday-vertical-tabs-container">
      <form onSubmit={formProps.handleSubmit(_handleSubmit)}>
        <div className="custom-tabs-wrapper custom-flex-start p-0 ">
          <div className="me-4">
            <TabsHeader Tabs={tabsConfiguration({})} activeIndex={activeStep} />
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
