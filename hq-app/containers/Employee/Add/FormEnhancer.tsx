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
import { ADD_UPDATE_FROM_PROPS } from '../types';
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} from 'services/modules/employee.api';
import { alertService } from '@fridayfood/shared/components/Alert';
import { useRouter } from 'next/router';
import ModalCustom from '@fridayfood/ui-toolkit/src/Modal';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { getQueryParam } from '@fridayfood/shared/components';
const steps = ['General', 'Address'];

const FormFormEnhancer = (props: ADD_UPDATE_FROM_PROPS) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getStoresList = (props: any) => {
    const storesList = [];
    for (let i = 0; i < props?.storesIds?.length; i++) {
      storesList.push({
        id: props?.storesIds[i],
        name: props?.stores,
      });
    }
    return storesList;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getRolesList = (props: any) => {
    const roleIds = props?.roleIds;
    const roleNames = props?.roles?.split(',');
    const rolesList = [];
    for (let i = 0; i < roleIds?.length; i++) {
      rolesList.push({
        id: roleIds[i],
        name: roleNames[i],
      });
    }
    return rolesList;
  };
  const StoreList = getStoresList(props);
  const RoleList = getRolesList(props);

  const tabs = getQueryParam('tabs');
  const [activeStep, setActiveStep] = useState(Number(tabs));
  const router = useRouter();
  const [confirmModal, setConfirmModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const isLastStep = activeStep === steps.length - 1;
  const [createEmployee, { isLoading: onCreateLoading }] =
    useCreateEmployeeMutation();
  const [updateEMployee, { isLoading: onUpdateLoading }] =
    useUpdateEmployeeMutation();

  const formProps = useForm<ADD_UPDATE_FROM_PROPS>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: {
      ...formInitialValues,
      employeeId: props?.code ? props?.code : '',
      role: RoleList,
      stores: StoreList,
    },
  });
  const { getValues } = formProps;
  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const value = getValues();

  const rolesValues = value?.role;
  const storesValues = value?.stores;
  const editRoles = rolesValues?.map((item: { name: string }) => item?.name);

  const editStores = storesValues?.map(
    (item: { id: string | number }) => item?.id,
  );
  const ModifiedPayload = {
    code: value.employeeId,
    userName: value.email,
    name: value.employeeName,
    type: value.employeeType,
    roleNames: props?.id ? value?.roleIdName : rolesValues,
    phoneNumber: value.number,
    email: value.email,
    payType: value.payType,
    payDetail: Number(value.payDetails),
    storeIds: props?.id ? value?.storeIdName : storesValues,
    isActive: value.active,
    password: value.password,
    pin: Number(value.pinNumber),
    addresses: value.addresses,
    lockoutEnabled: false,
    isPosUser: true,
  };

  const _handleSubmit = () => {
    if (isLastStep) {
      setConfirmModal(true);
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  const handleConfirm = async () => {
    const CreatePayloadpayload = { ...ModifiedPayload };
    const UpdatePayload = { ...ModifiedPayload, id: props?.id };
    if (props?.id) {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: string | number;
      } = await updateEMployee(UpdatePayload);
      if (response.data) {
        router.push(`/staffmanagement/employee/${props?.id}`);
        alertService.success('Updated', {
          keepAfterRouteChange: true,
          autoClose: true,
        });
      }
    } else {
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await createEmployee(CreatePayloadpayload);
      if (response.data) {
        router.push(`/staffmanagement/employee/${response?.data?.id}`);
        alertService.success('Created', {
          keepAfterRouteChange: true,
          autoClose: true,
        });
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    formProps?.setValue('employeeType', props?.type);
    formProps?.setValue('employeeId', props?.code);
    formProps?.setValue('employeeName', props?.name);
    formProps?.setValue('number', props?.phone);
    formProps?.setValue('email', props?.email);
    formProps?.setValue('payType', props?.payType);
    formProps?.setValue('payDetails', props?.payDetail);
    formProps?.setValue('active', props?.isActive);
    formProps?.setValue('password', props?.password);
    formProps?.setValue('pinNumber', props?.pin);
    formProps?.setValue('addresses', props?.addresses);
    formProps?.setValue('id', props?.id);
    formProps?.setValue('storeIdName', editStores);
    formProps?.setValue('roleIdName', editRoles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <div className="friday-vertical-tabs-container">
      <form onSubmit={formProps.handleSubmit(_handleSubmit)}>
        <div className="custom-tabs-wrapper custom-flex-start p-0 ">
          <div className="me-4">
            <TabsHeader Tabs={tabsConfiguration({})} activeIndex={activeStep} />
          </div>
          <div className="friday-card card-shadow-1 border-radius-10 mb-5">
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
            isLoading={onCreateLoading || onUpdateLoading}
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
