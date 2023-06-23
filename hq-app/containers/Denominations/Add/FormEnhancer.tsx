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
  useCreateDenominationsMutation,
  useUpdateDenominationsMutation,
} from 'services/modules/denominations.api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
const FormFormEnhancer = ({
  name,
  description,
  denominationsStores,
  position,
  id,
}: ADD_UPDATE_FROM_PROPS) => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const formProps = useForm<ADD_UPDATE_FROM_PROPS>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: id
      ? { name: name, description: description, position: position }
      : formInitialValues,
  });
  const { getValues, setValue } = formProps;
  useEffect(() => {
    setValue('name', name);
    setValue('description', description);
    setValue('position', position);
    setValue('denominationsStores', denominationsStores);
  }, []);
  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const allValues = getValues();
  const [createDenomination] = useCreateDenominationsMutation();
  const [updateDenomination] = useUpdateDenominationsMutation();
  const _handleSubmit = async () => {
    const payloadUpdate = { ...allValues, id };

    if (id) {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: string | number;
      } = await updateDenomination(payloadUpdate);
      if (response.data) {
        window.location.href = `/settings/denominations/${id}`;

        alertService.success('Updated!');
      }
    } else {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await createDenomination(allValues);
      if (response.data) {
        window.location.href = `/settings/denominations/${
          response?.data?.id ?? ''
        }`;
        alertService.success('Created!');
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
              router.push('/settings/denominations');
            }}
            subButtonTitle="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
