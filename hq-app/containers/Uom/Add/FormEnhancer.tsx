import { useState, useEffect } from 'react';
import FormFooterActions from '@fridayfood/shared/components/FromFooterAction';
import { RenderStepContent } from './Steps';
import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADD_UPDATE_UOM } from '../types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { alertService } from '@fridayfood/shared/components';
import {
  useCreateUpdateUOMMutation,
  useFetchUOMQuery,
} from 'services/modules/uom.api';
import router from 'next/router';

const UOMFormEnhancer = (props: ADD_UPDATE_UOM) => {
  const [createUpdateUOM] = useCreateUpdateUOMMutation();
  const { data } = useFetchUOMQuery({});
  const ID = data?.items[0]?.id;
  const [activeStep] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formProps: any = useForm<ADD_UPDATE_UOM>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: formInitialValues,
  });

  useEffect(() => {
    if (props.id) {
      formProps.setValue('uomName', props.name);
      formProps?.setValue('name', props?.name);
      formProps?.setValue('description', props?.description);
      formProps?.setValue('id', props?.id);
    }
  }, [props]);

  const reloadPage = () => {
    window.location.href = `/settings/uom/${ID}`;
  };
  const _handleSubmit = async (values: ADD_UPDATE_UOM) => {
    const payload = {
      id: Number(props.id) ? Number(props.id) : 0,
      name: values.uomName,
      symbol: '',
      description: values.description,
      externalId: '',
      tenantId: null,
    };
    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: string | number;
    } = await createUpdateUOM(payload);
    if (response?.data) {
      reloadPage();
      router.push(`/settings/uom/${ID}`);
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
          <div className="friday-card card-shadow-1 border-radius-10 mb-4">
            <RenderStepContent step={activeStep} formData={formProps} />
          </div>
          <FormFooterActions isLastStep={true} activeStep={activeStep} />
        </div>
      </form>
    </div>
  );
};

export default UOMFormEnhancer;
