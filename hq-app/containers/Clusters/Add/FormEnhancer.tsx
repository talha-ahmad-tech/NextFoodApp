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
import {
  useCreateClusterMutation,
  useUpdateClusterMutation,
} from 'services/modules/clusters.api';
import { useRouter } from 'next/router';
import { alertService } from '@fridayfood/shared/components';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
const FormFormEnhancer = ({
  name,
  description,
  clusterStores,
  id,
}: ADD_UPDATE_FROM_PROPS) => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const editStores = clusterStores?.map(
    (item: { storeId: string; store: { name: string }; name: string }) => {
      return {
        storeId: item.storeId,
        name: item?.store?.name,
        id: item.storeId,
      };
    },
  );
  const reloadPage = () => {
    window.location.reload();
  };

  const formProps = useForm<ADD_UPDATE_FROM_PROPS>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: id
      ? { name: name, description: description, stores: editStores, id: id }
      : formInitialValues,
  });
  const { getValues } = formProps;
  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const allValues = getValues();
  const [createCluster] = useCreateClusterMutation();
  const [updateCluster] = useUpdateClusterMutation();
  const _handleSubmit = async () => {
    const ModifiedPayload = {
      name: allValues?.name,
      description: allValues?.description,
      clusterStores: allValues?.stores,
    };
    const payloadUpdate = { ...ModifiedPayload, id: Number(id) };

    if (id) {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await updateCluster(payloadUpdate);
      if (response.data) {
        alertService.success('Updated!');
        router.push(`/storemanagement/clusters/${response?.data?.id ?? ''}`);
      } else {
        alertService.error('Error');
      }
    } else {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await createCluster(ModifiedPayload);
      if (response.data) {
        reloadPage();
        alertService.success('Created!');
        router.push(`/storemanagement/clusters/${response?.data?.id ?? ''}`);
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
              router.push('/storemanagement/clusters');
            }}
            subButtonTitle="Cancel"
          />
        </div>
      </form>
    </div>
  );
};
export default FormFormEnhancer;
