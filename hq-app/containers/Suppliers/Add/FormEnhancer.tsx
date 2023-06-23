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
import { ADD_UPDATE_SUPPLIERS } from '../types';
import { alertService, getQueryParam } from '@fridayfood/shared/components';
import { useCreateSupplierMutation } from 'services/modules/suppliers.api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import ModalCustom from '@fridayfood/ui-toolkit/src/Modal';

const steps = ['General', 'Address'];

const FormFormEnhancer = (props: ADD_UPDATE_SUPPLIERS) => {
  const tabs = getQueryParam('tabs');
  const router = useRouter();
  const [confirmModal, setConfirmModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [activeStep, setActiveStep] = useState(Number(tabs));
  const isLastStep = activeStep === steps.length - 1;
  const editTaxes = props?.taxes?.map(
    (item: { tax: { name: string; id: string | number } }) => {
      return { taxId: item?.tax?.id, name: item?.tax?.name };
    },
  );

  const editStores = props?.stores?.map(
    (item: { store: { name: string; id: string | number } }) => {
      return { storeId: item?.store?.id, name: item?.store?.name };
    },
  );
  const formProps = useForm<ADD_UPDATE_SUPPLIERS>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: props?.id
      ? { taxId: editTaxes, store: editStores }
      : { ...formInitialValues, code: props?.code ? props?.code : '' },
  });
  const { getValues } = formProps;
  const value = getValues();
  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const [createSupplier] = useCreateSupplierMutation();

  const Address = value?.addresses;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ModifiedAddress = Address?.map((item: any) => {
    return {
      ...item,
      city: { id: item?.cityId, name: item?.cityName },
      country: { id: item?.countryId, name: item?.countryName },
      state: { id: item?.stateId, name: item?.stateName },
    };
  });

  const ModifiedPayload = {
    code: value?.code,
    name: value?.name,
    description: value?.description,
    contactNumber: value?.contactNumber,
    email: value?.email,
    taxes: value?.taxId,
    stores: value?.store,
    addresses: ModifiedAddress,
  };
  const updatePayload = { ...ModifiedPayload, id: props?.id };
  const _handleSubmit = async () => {
    if (isLastStep) {
      setConfirmModal(true);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleConfirm = async () => {
    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: string | number;
    } = await createSupplier(props?.id ? updatePayload : ModifiedPayload);
    if (response.data) {
      router.push(`/inventorymanagement/suppliers/${props?.id}`);
      alertService.success(props?.id ? 'Updated!' : 'Created!', {
        keepAfterRouteChange: true,
        autoClose: true,
      });
    }
  };

  useEffect(() => {
    formProps?.setValue('id', props?.id);
    formProps?.setValue('code', props?.code);
    formProps?.setValue('name', props?.name);
    formProps?.setValue('description', props?.description);
    formProps?.setValue('contactNumber', props?.contactNumber);
    formProps?.setValue('email', props?.email);
    formProps?.setValue('taxIdName', value?.taxId);
    formProps?.setValue('storeIdName', value?.store);
    formProps?.setValue('taxId', editTaxes);
    formProps?.setValue('store', editStores);
  }, [props]);

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
            isLastStep={isLastStep}
          />

          <ModalCustom
            show={confirmModal}
            close={() => setConfirmModal(false)}
            handleConfirm={handleConfirm}
            customClass
            hideFooter
            customFooter
            modalWidth="custom-small-modal"
            saveButtonType="button"
          >
            <div style={{ paddingBottom: '20px' }}>
              <p>Are you sure you want to Submit?</p>
            </div>
          </ModalCustom>
          <ModalCustom
            show={cancelModal}
            close={() => setCancelModal(false)}
            handleConfirm={() => {
              router.push('/staffmanagement/employee');
            }}
            customClass
            hideFooter
            customFooter
            modalWidth="custom-small-modal"
            saveButtonType="button"
          >
            <div style={{ paddingBottom: '20px' }}>
              <p>Are you sure you want to Cancel?</p>
            </div>
          </ModalCustom>
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
