import { useState } from 'react';
import FormFooterActions from '@fridayfood/shared/components/FromFooterAction';
import { RenderStepContent } from './Steps';
import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { alertService } from '@fridayfood/shared/components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADD_CATEGORY_TYPE, ADD_UPDATE_FROM_PROPS } from '../types';
import { useCreateUpdateCategoryMutation } from 'services/modules/categories.api';

const FormFormEnhancer = ({ CategoryDetails, code }: ADD_UPDATE_FROM_PROPS) => {
  const [activeStep, setActiveStep] = useState(0);
  const formProps = useForm<ADD_CATEGORY_TYPE>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: CategoryDetails?.id
      ? {
          categoryCode: CategoryDetails?.categoryCode,
          description: CategoryDetails?.description,
          itemGroupId: `${CategoryDetails?.itemGroup?.name ?? ''}`,
          itemGroupIdName: `${CategoryDetails?.itemGroup?.id}`,

          name: CategoryDetails?.name,
          position: CategoryDetails?.position,
          active: CategoryDetails?.active,
          featured: CategoryDetails?.featured,
          defaultImage: CategoryDetails?.defaultImage,
          uploadImage: CategoryDetails?.uploadImage,
          hideOnline: CategoryDetails?.hideOnline,
          hideOnPos: CategoryDetails?.hideOnPOS,
        }
      : { ...formInitialValues, categoryCode: code },
  });

  const [createUpdateCategory] = useCreateUpdateCategoryMutation();

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const _handleSubmit = async (values: ADD_CATEGORY_TYPE) => {
    const payload = CategoryDetails?.id
      ? {
          ...values,
          id: CategoryDetails?.id,
          itemGroupId: values?.itemGroupIdName,
          categoryCode: values?.categoryCode ?? '',
          hideOnline: values?.hideOnline,
          hideOnPos: values?.hideOnPos,
          active: values?.active,
          featured: values?.featured,
          imageUrl: values?.uploadImage,
          tenantId: null,
          externalId: '',
        }
      : {
          ...values,
          id: 0,
          itemGroupId: values?.itemGroupIdName,
          categoryCode: values?.categoryCode ?? '',
          hideOnline: values?.hideOnline,
          hideOnPos: values?.hideOnPos,
          active: values?.active,
          featured: values?.featured,
          imageUrl: values?.uploadImage,
          tenantId: null,
          externalId: '',
        };
    // handleAdd(payload, Number(CategoryDetails?.id));
    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: { [key: string]: string | number | object };
    } = await createUpdateCategory(payload);
    if (response.data) {
      window.location.href = `/menumanagement/categories/${
        response?.data?.id ?? ''
      }`;
      alertService.success(CategoryDetails?.id ? 'Updated!' : 'Created', {
        keepAfterRouteChange: true,
        autoClose: true,
      });
    }
  };

  return (
    <div className="friday-vertical-tabs-container">
      <form onSubmit={formProps.handleSubmit(_handleSubmit)}>
        <div className="custom-tabs-wrapper custom-flex-start p-0 ">
          {/* <div className="friday-card card-shadow-1 border-radius-10 mb-5"> */}
          <RenderStepContent step={activeStep} formData={formProps} />
          {/* </div> */}
          <FormFooterActions
            isLastStep={true}
            activeStep={activeStep}
            handleBack={_handleBack}
            heading={CategoryDetails?.id ? 'Update' : 'Submit'}
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
