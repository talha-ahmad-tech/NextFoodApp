import { useEffect, useState } from 'react';
import TabsHeader from '@fridayfood/shared/components/TabsDetail/TabsHeader';
import FormFooterActions from '@fridayfood/shared/components/FromFooterAction';
import { RenderStepContent } from './Steps';
import { useRouter } from 'next/router';
import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { tabsConfiguration } from '../config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADD_PAYMENT_METHOD_TYPE, ADD_UPDATE_FROM_PROPS } from '../types';
import { useCreateUpdatePaymentMethodMutation } from 'services/modules/payment.api';
import { alertService } from '@fridayfood/shared/components';

const FormFormEnhancer = ({
  paymentMethodDetails,
  code,
}: ADD_UPDATE_FROM_PROPS) => {
  const [activeStep, setActiveStep] = useState(0);
  const formProps = useForm<ADD_PAYMENT_METHOD_TYPE>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: formInitialValues,
  });

  useEffect(() => {
    formProps.setValue('code', paymentMethodDetails?.code ?? code),
      formProps.setValue('name', paymentMethodDetails?.name ?? ''),
      formProps.setValue(
        'description',
        paymentMethodDetails?.description ?? '',
      ),
      formProps.setValue('position', paymentMethodDetails?.position ?? ''),
      formProps.setValue(
        'orderSource',
        paymentMethodDetails?.orderSource ?? '',
      );
  }, []);
  const router = useRouter();
  const [createUpdateMethod] = useCreateUpdatePaymentMethodMutation();

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const _handleSubmit = async (values: ADD_PAYMENT_METHOD_TYPE) => {
    const id = paymentMethodDetails?.id;
    const payload = id
      ? {
          ...values,
          id,
          externalId: '',
          code: paymentMethodDetails?.code,
          tenantId: null,
        }
      : {
          ...values,
          code: code,
          orderSource: Number(values.orderSource),
          externalId: '',
          tenantId: null,
        };
    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: { [key: string]: string | number | object };
    } = await createUpdateMethod(payload);
    if (response.data) {
      window.location.href = `/settings/payment/${id}`;
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
          <div className="friday-card card-shadow-1 border-radius-10 mb-4">
            <RenderStepContent step={activeStep} formData={formProps} />
          </div>
          <FormFooterActions
            activeStep={activeStep}
            isLastStep={true}
            handleBack={_handleBack}
            heading={paymentMethodDetails?.id ? 'Update' : 'Submit'}
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
