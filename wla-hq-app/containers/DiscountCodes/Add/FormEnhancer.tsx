import { useEffect, useState } from 'react';
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
  useCreateDiscountMutation,
  useUpdateDiscountMutation,
} from 'services/modules/discount.api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import moment from 'moment';
const DiscountFormEnhancer = ({
  name,
  code,
  type,
  amount,
  discountProducts,
  discountItemGroups,
  discountStores,
  customerLimit,
  maximumAmount,
  maximumLimit,
  startDate,
  endDate,
  id,
}: ADD_UPDATE_FROM_PROPS) => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  let productOtions = discountProducts || [];
  productOtions = productOtions?.map((items: any) => items?.id);
  let itemGroupOtions = discountItemGroups || [];

  itemGroupOtions = itemGroupOtions?.map((items: any) => items?.id);
  let storeOtions = discountStores || [];

  storeOtions = storeOtions?.map((items: any) => items?.id);

  const formProps = useForm<ADD_UPDATE_FROM_PROPS>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: id
      ? {
          discountItemGroups: discountItemGroups,
          discountStores: discountStores,
          discountProducts: discountProducts,
        }
      : formInitialValues,
  });
  const { getValues, setValue } = formProps;

  useEffect(() => {
    setValue('name', name);
    setValue('type', type);
    setValue('code', code);
    setValue('amount', amount);
    setValue('maximumAmount', maximumAmount);
    setValue('customerLimit', customerLimit);
    setValue('maximumLimit', maximumLimit);
    setValue('startDate', moment(startDate).format('YYYY-MM-DD'));
    setValue('endDate', moment(endDate).format('YYYY-MM-DD'));
  }, []);

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const allValues = getValues();
  const [createDiscount] = useCreateDiscountMutation();
  const [updateDiscount] = useUpdateDiscountMutation();
  const _handleSubmit = async () => {
    const payloadUpdate = { ...allValues, id, isActive: true, tenantId: 1 };
    if (id) {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: string | number;
      } = await updateDiscount(payloadUpdate);
      if (response.data) {
        window.location.href = `/settings/discountcode/${id}`;

        alertService.success('Updated!');
      }
    } else {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { data: { [key: string]: string | number } };
      } = await createDiscount(payloadUpdate);
      if (response?.data) {
        window.location.href = `/settings/discountcode/${response?.data?.data?.id}`;
        alertService.success('Created!');
      }
    }
  };

  return (
    <div className="friday-vertical-tabs-container">
      <form onSubmit={formProps.handleSubmit(_handleSubmit)}>
        <div className="custom-tabs-wrapper custom-flex-start p-0 ">
          <div className="friday-card card-shadow-1 border-radius-10 mb-4">
            <RenderStepContent step={activeStep} formData={formProps} />
          </div>
          <FormFooterActions
            heading="Save"
            activeStep={activeStep}
            handleBack={_handleBack}
            isLastStep={true}
            subButton={true}
            handleSubButton={() => {
              router.push('/settings/discountcode');
            }}
            subButtonTitle="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

export default DiscountFormEnhancer;
