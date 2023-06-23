import { useEffect, useState } from 'react';
import FormFooterActions from '@fridayfood/shared/components/FromFooterAction';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { RenderStepContent } from './Steps';
import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADD_UPDATE_FROM_PROPS } from '../types';
import {
  useCreateRegionMutation,
  useUpdateRegionMutation,
} from 'services/modules/regions.api';
import { useRouter } from 'next/router';
import { alertService } from '@fridayfood/shared/components';
const FormFormEnhancer = ({
  name,
  description,
  stores,
  id,
}: ADD_UPDATE_FROM_PROPS) => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const formProps = useForm<ADD_UPDATE_FROM_PROPS>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: formInitialValues,
  });

  useEffect(() => {
    if (id) {
      formProps.setValue('name', name);
      formProps.setValue('description', description);
      formProps.setValue('stores', stores);
    }
  }, [name, description, stores]);
  const { getValues } = formProps;

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const allValues = getValues();
  console.log('allValues', allValues);

  const reloadPage = () => {
    window.location.reload();
  };

  const [CreateRegion] = useCreateRegionMutation();
  const [updateReigon] = useUpdateRegionMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _stores = [...allValues?.stores]?.map((item: any) => {
    return {
      id: 0,
      storeId: item?.storeId,
      regionId: id ?? 0,
    };
  });

  const _handleSubmit = async () => {
    const ModifiedPayload = {
      name: allValues?.name,
      description: allValues?.description,
      stores: _stores,
    };
    const payloadUpdate = { ...ModifiedPayload, id: Number(id) };

    if (id) {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await updateReigon(payloadUpdate);
      if (response.data) {
        alertService.success('Updated!');
        router.push(
          `/storemanagement/regions/${response?.data?.id ?? ''}`,
        );
      } else {
        alertService.error('Error');
      }
    } else {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await CreateRegion(ModifiedPayload);
      if (response.data) {
        reloadPage();
        alertService.success('Created!');
        router.push(
          `/storemanagement/regions/${response?.data?.id ?? ''}`,
        );
      } else {
        alertService.error('Error');
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
              router.push('/storemanagement/regions');
            }}
            subButtonTitle="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
