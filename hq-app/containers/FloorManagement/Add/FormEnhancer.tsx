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
import { useRouter } from 'next/router';
import { alertService } from '@fridayfood/shared/components';
import {
  useCreateFloorMutation,
  useUpdateFloorMutation,
} from 'services/modules/floors.api';
const FormFormEnhancer = ({
  id,
  name,
  width,
  height,
  noOfTables,
  noOfSeats,
  vacant,
  serving,
  reserved,
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
      formProps.setValue('width', width);
      formProps.setValue('height', height);
      formProps.setValue('noOfTables', noOfTables);
      formProps.setValue('noOfSeats', noOfSeats);
      formProps.setValue('vacant', vacant);
      formProps.setValue('serving', serving);
      formProps.setValue('reserved', reserved);
    }
  }, [
    name,
    width,
    height,
    noOfTables,
    noOfSeats,
    vacant,
    serving,
    reserved,
    id,
    formProps,
  ]);
  const { getValues } = formProps;

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const allValues = getValues();
  console.log('allValues', allValues);

  const reloadPage = () => {
    window.location.reload();
  };

  const [CreateFloor] = useCreateFloorMutation();
  const [updateFloor] = useUpdateFloorMutation();

  const _handleSubmit = async () => {
    const ModifiedPayload = {
      ...allValues,
    };
    const payloadUpdate = { ...ModifiedPayload, id: Number(id) };

    if (id) {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await updateFloor(payloadUpdate);
      if (response.data) {
        reloadPage();
        alertService.success('Updated!');
        router.push(
          `/storemanagement/floorManagement/${response?.data?.id ?? ''}`,
        );
      } else {
        alertService.error('Error');
      }
    } else {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await CreateFloor(ModifiedPayload);
      if (response.data) {
        reloadPage();
        alertService.success('Created!');
        router.push(
          `/storemanagement/floorManagement/${response?.data?.id ?? ''}`,
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
              router.push('/storemanagement/floorManagement');
            }}
            subButtonTitle="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
