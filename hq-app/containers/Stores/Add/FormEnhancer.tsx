import { memo, useEffect, useState } from 'react';
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
import { ADD_UPDATE_FROM_PROPS } from '../types';
import ModalCustom from '@fridayfood/ui-toolkit/src/Modal';
import { useCreateStoreMutation } from 'services/modules/stores.api';
import { useRouter } from 'next/router';
import { alertService } from '@fridayfood/shared/components';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { getQueryParam } from '@fridayfood/shared/components';
const FormFormEnhancer = (props: ADD_UPDATE_FROM_PROPS) => {
  const tabs = getQueryParam('tabs');
  const steps = ['Stores', 'Address'];
  const [activeStep, setActiveStep] = useState(Number(tabs));
  const [confirmModal, setConfirmModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const router = useRouter();
  const isLastStep = activeStep === steps.length - 1;
  const formProps = useForm<ADD_UPDATE_FROM_PROPS>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: props?.id
      ? {
          tax: props?.storeTaxes,
          paymentMethod: props?.storePaymentMethods,
        }
      : {
          ...formInitialValues,
          storeId: props?.code ? props?.code : 'ST-123',
        },
  });
  const [createStore] = useCreateStoreMutation();

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const allValues = formProps.getValues();
  function _handleSubmit() {
    if (isLastStep) {
      setConfirmModal(true);
    } else {
      setActiveStep(activeStep + 1);
    }
  }
  const handleConfirm = async () => {
    const ModifiedAddress = {
      address: allValues?.address,
      contactNumber: allValues?.contactNumber,
      email: allValues?.email,
      country: {
        id: allValues?.countryId,
        name: allValues?.countryName,
      },
      countryId: allValues?.countryId,
      state: {
        id: allValues?.stateId,
        name: allValues?.stateName,
      },
      stateId: allValues?.stateId,
      city: {
        id: allValues?.cityId,
        name: allValues?.cityName,
      },
      cityId: allValues?.cityId,
      entityId: 0,
      entityType: 1,
    };

    const ModifiedAddressUpdate = {
      address: allValues?.address,
      contactNumber: allValues?.contactNumber,
      email: allValues?.email,
      entityId: 0,
      entityType: 1,
      countryId: allValues?.countryNameId,
      stateId: allValues?.stateNameId,
      cityId: allValues?.cityNameId,
    };
    // const Tax = allValues.tax;
    // const ModifiedTax = Tax?.map((item: { id: string; taxId: string }) => {
    //   return { id: item.id, taxId: item.taxId };
    // });

    const ModidfiedPayload = {
      code: allValues?.storeId,
      name: allValues?.storeName,
      type: allValues?.storeType,
      storePaymentMethods: allValues?.paymentMethod,
      todayFilterType: allValues?.todayFilterType,
      storeTaxes: allValues?.tax,
      numberSequence: allValues?.numberSequence,
      priceExclusiveTax: allValues?.priceExclusiveTax,
      floor: allValues?.floor,
      active: allValues?.active,
      discountExclusiveTax: allValues?.discountExclusiveTax,
      showMenuImages: allValues?.showMenuImages,
      parkEnabled: allValues?.parkEnabled,
      storeLogo: allValues?.storeLogo,
      storeAddress: props?.id ? ModifiedAddressUpdate : ModifiedAddress,
      currencyId: allValues?.currencyName,
      deliveryCharges: Number(allValues?.deliveryCharges),
    };
    const payload = props?.id
      ? {
          ...ModidfiedPayload,
          id: Number(props?.id),
        }
      : { ...ModidfiedPayload };
    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: { [key: string]: string | number };
    } = await createStore(payload);
    if (response.data) {
      setConfirmModal(false);
      router.push(`/storemanagement/stores/${response?.data?.id}?tabs=0`);
      alertService.success(props?.id ? 'Updated!' : 'Created', {
        keepAfterRouteChange: true,
        autoClose: true,
      });
    }
  };

  useEffect(() => {
    formProps?.setValue('deliveryCharges', props?.deliveryCharges);
    formProps?.setValue('paymentMethod', props?.storePaymentMethods);
    formProps?.setValue('id', props?.id);
    formProps?.setValue('storeId', props?.code);
    formProps?.setValue('storeName', props?.name);
    formProps?.setValue('storeType', props?.type);
    // formProps?.setValue('paymentMethod', props?.paymentMethod);
    formProps?.setValue('active', props?.active);
    formProps?.setValue('priceExclusiveTax', props?.priceExclusiveTax);
    formProps?.setValue('parkEnabled', props?.parkEnabled);
    formProps?.setValue('discountExclusiveTax', props?.discountExclusiveTax);
    formProps?.setValue('showMenuImages', props?.showMenuImages);
    // formProps?.setValue('tax', props?.tax);
    formProps?.setValue('todayFilterType', props?.todayFilterType);
    formProps?.setValue('numberSequence', props?.numberSequence);
    // formProps?.setValue('addresses', props?.storeAddress);
    formProps?.setValue('currencyName', props?.currency?.id);
    formProps?.setValue('currencyId', props?.currency?.name);
    formProps?.setValue('floor', props?.floor);
    formProps?.setValue('storeTaxes', props?.storeTaxes);
    formProps?.setValue('address', props?.storeAddress?.address);
    formProps?.setValue('contactNumber', props?.storeAddress?.contactNumber);
    formProps?.setValue('email', props?.storeAddress?.email);
    formProps?.setValue('countryId', props?.storeAddress?.country?.name);
    formProps?.setValue('stateId', props?.storeAddress?.state?.name);
    formProps?.setValue('cityId', props?.storeAddress?.city?.name);

    formProps?.setValue('countryNameId', props?.storeAddress?.country?.id);
    formProps?.setValue('stateNameId', props?.storeAddress?.state?.id);
    formProps?.setValue('cityNameId', props?.storeAddress?.city?.id);
  }, [props]);

  return (
    <div className="friday-vertical-tabs-container">
      <form onSubmit={formProps.handleSubmit(_handleSubmit)}>
        <div className="custom-tabs-wrapper custom-flex-start p-0 ">
          <div className="me-4">
            <TabsHeader
              Tabs={tabsConfiguration({ hide: true })}
              activeIndex={activeStep}
            />
          </div>
          <div className="w-100">
            <RenderStepContent step={activeStep} formData={formProps} />
          </div>
          <FormFooterActions
            activeStep={activeStep}
            handleBack={_handleBack}
            isLastStep={isLastStep}
            subButton={true}
            handleSubButton={() => {
              setCancelModal(true);
            }}
            subButtonTitle="Cancel"
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
              router.push('/storemanagement/stores');
            }}
            customClass
            hideFooter
            customFooter
            modalWidth="custom-small-modal"
            saveButtonType="submit"
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

export default memo(FormFormEnhancer);
