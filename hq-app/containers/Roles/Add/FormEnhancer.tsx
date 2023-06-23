import { useState } from 'react';
import FormFooterActions from '@fridayfood/shared/components/FromFooterAction';
import { RenderStepContent } from './Steps';
import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADD_UPDATE_ROLES } from '../types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { alertService } from '@fridayfood/shared/components';
import { useCreateRolesMutation } from 'services/modules/roles.api';
const FormFormEnhancer = ({
  name,
  isDefault,
  isPublic,
  id,
}: ADD_UPDATE_ROLES) => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const formProps = useForm<ADD_UPDATE_ROLES>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: id
      ? { isDefault: isDefault, isPublic: isPublic, name: name }
      : formInitialValues,
  });
  const { getValues } = formProps;
  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const allValues = getValues();
  const [createRoles] = useCreateRolesMutation();
  const _handleSubmit = async () => {
    const payload = id ? { ...allValues, id } : { ...allValues };
    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: string | number;
    } = await createRoles(payload);
    if (response.data) {
      router.push('/staffmanagement/roles');
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
              router.push('/staffmanagement/roles');
            }}
            subButtonTitle="Back"
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
