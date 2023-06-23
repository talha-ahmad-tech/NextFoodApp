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
import { ADD_UPDATE_NUMBER_SERIES } from '../types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { useCreateUpdateNumberSeriesMutation } from 'services/modules/numberSeries.api';
import { useRouter } from 'next/router';
import { alertService } from '@fridayfood/shared/components';
// const steps = ['General'];
const FormFormEnhancer = (props: ADD_UPDATE_NUMBER_SERIES) => {
  const [activeStep, setActiveStep] = useState(0);
  const [createUpdateNumberSeries] = useCreateUpdateNumberSeriesMutation();

  // const isLastStep = activeStep === steps.length - 1;
  const formProps = useForm<ADD_UPDATE_NUMBER_SERIES>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: formInitialValues,
  });
  const router = useRouter();

  useEffect(() => {
    if (props?.id) {
      formProps.setValue('Module', props?.module);
      formProps.setValue('form', props?.type);
      formProps.setValue('prefix', props?.prefix);
      formProps.setValue('suffix', props?.suffix);

      formProps.setValue('prefixText', props?.prefix);
      formProps.setValue('suffixText', props?.suffix);
      formProps.setValue('min', props?.min);
      formProps.setValue('max', props?.max);
      formProps.setValue('minNumber', Number(props?.min));
      formProps.setValue('maxNumber', Number(props?.max));
      formProps.setValue('isOverwrite', props?.isOverwrite);
      formProps.setValue('continuous', props?.continuous);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const _handleSubmit = async (values?: ADD_UPDATE_NUMBER_SERIES) => {
    const payload = {
      id: props?.id,
      ...values,
    };
    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: { [key: string]: string | number };
    } = await createUpdateNumberSeries(payload);

    if (response.data) {
      router.push(`/settings/numberseries/${response?.data?.id ?? ''}`);
      alertService.success(props?.id ? 'Updated!' : 'Created', {
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
            handleBack={_handleBack}
            isLastStep={true}
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
