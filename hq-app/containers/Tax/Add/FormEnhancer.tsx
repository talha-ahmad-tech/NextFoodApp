import { useEffect, useState } from 'react';
import TabsHeader from '@fridayfood/shared/components/TabsDetail/TabsHeader';
import FormFooterActions from '@fridayfood/shared/components/FromFooterAction';
import { RenderStepContent } from './Steps';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
import { tabsConfiguration } from '../config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADD_TAX_TYPE, ADD_UPDATE_FROM_PROPS } from '../types';
import { alertService } from '@fridayfood/shared/components';
import { useCreateUpdateTaxMutation } from 'services/modules/tax.api';
import { useRouter } from 'next/router';

const FormFormEnhancer = ({ taxDetails, code }: ADD_UPDATE_FROM_PROPS) => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const [createUpdateTax] = useCreateUpdateTaxMutation();

  const formProps = useForm<ADD_TAX_TYPE>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: taxDetails?.id
      ? {
          name: taxDetails?.name,
          description: taxDetails?.description,
          taxRate: taxDetails?.taxRate,
          taxType: taxDetails?.taxType,
          taxStores: taxDetails?.taxStores,
          clusterId: taxDetails?.clusterId,
          taxItemGroups: taxDetails.taxItemGroups,
          taxProducts: taxDetails?.taxProducts,
          taxId: code,
          code: code,
        }
      : formInitialValues,
  });
  useEffect(() => {
    formProps.setValue('name', taxDetails?.name);
    formProps.setValue('description', taxDetails?.description);
    formProps.setValue('taxRate', taxDetails?.taxRate);
    formProps.setValue('taxType', taxDetails?.taxType);
    formProps.setValue('taxStores', taxDetails?.taxStores);
    formProps.setValue('clusterId', taxDetails?.clusterId);
    formProps.setValue('clusters', taxDetails?.clusterId);
    formProps.setValue('clusterName', taxDetails?.cluster?.name);
    formProps.setValue('taxItemGroups', taxDetails?.taxItemGroups);
    formProps.setValue('taxProducts', taxDetails?.taxProducts);
    formProps.setValue('taxId', code ?? taxDetails?.code);
    formProps.setValue('code', code ?? taxDetails?.code);
  }, []);
  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const _handleSubmit = async (values: ADD_TAX_TYPE) => {
    const clusterId = `${values?.clusters}`;
    const id = taxDetails?.id;
    const payload = {
      id: Number(id) ? Number(id) : 0,
      tenantId: null,
      code: values.code,
      name: String(values?.name),
      description: String(values?.description),
      taxRate: Number(values?.taxRate) ?? 0,
      taxType: values?.taxType,
      taxId: values?.taxId ?? 0,
      externalId: '',
      taxItemGroups: values?.taxItemGroups?.map(item => {
        return {
          ...item,
          taxId: Number(id) ? Number(id) : 0,
        };
      }),
      taxProducts: values?.taxProducts?.map(item => {
        return {
          ...item,
          taxId: Number(id) ? Number(id) : 0,
        };
      }),
      taxStores: values?.taxStores?.map(item => {
        return {
          ...item,
          taxId: Number(id) ? Number(id) : 0,
        };
      }),
      clusterId: Number(clusterId),
    };

    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: { [key: string]: string | number | object };
    } = await createUpdateTax(payload);
    if (response.data) {
      router.push(`/settings/tax/${response?.data?.id}`);
      alertService.success(id ? 'Updated!' : 'Created', {
        keepAfterRouteChange: true,
        autoClose: true,
      });
    }
  };

  return (
    <div className="friday-vertical-tabs-container">
      <form onSubmit={formProps.handleSubmit(_handleSubmit)}>
        <div className="custom-tabs-wrapper custom-flex-start p-0">
          <div className="me-4">
            <TabsHeader Tabs={tabsConfiguration({})} activeIndex={activeStep} />
          </div>
          <div className="friday-card card-shadow-1 border-radius-10 mb-4">
            <RenderStepContent step={activeStep} formData={formProps} />
          </div>
          <FormFooterActions
            activeStep={activeStep}
            handleBack={_handleBack}
            isLastStep={true}
            heading={taxDetails?.id ? 'Update' : 'Submit'}
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
