import { useState } from 'react';
import FormFooterActions from '@fridayfood/shared/components/FromFooterAction';
import { RenderStepContent } from './Steps';
import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADD_UPDATE_FROM_PROPS } from '../types';

import { useRouter } from 'next/router';
import { alertService } from '@fridayfood/shared/components';
import {
  useCreateKitchenMutation,
  useUpdateKitchenMutation,
} from 'services/modules/kitchen.api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
const FormFormEnhancer = ({
  name,
  description,
  id,
  categoryId,
  categoryName,
}: ADD_UPDATE_FROM_PROPS) => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const formProps = useForm<ADD_UPDATE_FROM_PROPS>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: id
      ? {
          name: name,
          description: description,
          productCategory: categoryName,
          productCategoryName: categoryId,
          id: id,
        }
      : formInitialValues,
  });
  const { getValues } = formProps;

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const allValues = getValues();

  const [createKitchen] = useCreateKitchenMutation();
  const [updateKitchen] = useUpdateKitchenMutation();
  const _handleSubmit = async () => {
    const ModifiedPayload = {
      name: allValues.name,
      description: allValues?.description,

      categoryId: allValues?.productCategory,
    };
    const payloadUpdate = {
      categoryId: allValues?.productCategoryName,
      name: allValues?.name,
      description: allValues?.description,
      id: Number(id),
    };
    if (id) {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await updateKitchen(payloadUpdate);
      if (response.data) {
        alertService.success('Updated!');
        router.push(`/settings/kitchenPrinter/${response?.data?.id ?? ''}`);
      } else {
        alertService.error('Error');
      }
    } else {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await createKitchen(ModifiedPayload);
      if (response.data) {
        alertService.success('Created!');
        router.push(`/settings/kitchenPrinter/${response?.data?.id ?? ''}`);
      } else {
        alertService.error('Error');
      }
    }
  };

  return (
    <div className="friday-vertical-tabs-container">
      <form onSubmit={formProps.handleSubmit(_handleSubmit)}>
        <div className="custom-tabs-wrapper custom-flex-start p-0 ">
          <div className="friday-card card-shadow-1 border-radius-10 mb-5">
            <RenderStepContent step={activeStep} formData={formProps} />
          </div>
          <FormFooterActions
            heading="Save"
            activeStep={activeStep}
            handleBack={_handleBack}
            isLastStep={true}
            subButton={true}
            handleSubButton={() => {
              router.push('/settings/kitchenPrinter');
            }}
            subButtonTitle="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
