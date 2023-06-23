import { useEffect, useState } from 'react';
import TabsHeader from '@fridayfood/shared/components/TabsDetail/TabsHeader';
import FormFooterActions from '@fridayfood/shared/components/FromFooterAction';
import { RenderStepContent } from './Steps';
import {
  formInitialValues,
  validationSchema,
  validationSchemaEdit,
} from './FormConfig/validationSchema';
import { tabsConfiguration } from '../config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  COMPANY_DETAILS,
  // ADD_UPDATE_COMPANY
} from '../types';
import { alertService, getQueryParam } from '@fridayfood/shared/components';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { useCompanyMutation } from 'services/modules/company.api';
import { useRouter } from 'next/router';

const steps = ['General', 'Address', 'Legal Entity', 'Contact'];

const FormFormEnhancer = ({
  id,
  vat,
  currency,
  currencyId,
  language,
  timeZoneId,
  timeZone,
  wlaApp,
  name,
  logo,
  subDomain,
  isActive,
  legalName,
  contactName,
  addresses,
  contactNumber,
}: // companyDetails = {},
COMPANY_DETAILS) => {
  const tabs = getQueryParam('tabs');
  const [activeStep, setActiveStep] = useState(Number(tabs));
  const router = useRouter();
  const isLastStep = activeStep === steps.length - 1;
  const formProps = useForm<COMPANY_DETAILS>({
    mode: 'onTouched',
    resolver: yupResolver(
      id ? validationSchemaEdit[activeStep] : validationSchema[activeStep],
    ),
    defaultValues: id
      ? {
          ...formInitialValues,
          // language: Number(language) === 1 ? 'English UK' : 'English USA',
          language,
        }
      : formInitialValues,
  });
  const [company] = useCompanyMutation();
  useEffect(() => {
    if (id) {
      formProps.setValue('name', name);
      formProps.setValue('currencyId', currency);
      formProps.setValue('currency', currencyId);
      formProps.setValue('timeZoneId', timeZone);
      formProps.setValue('timeZone', timeZoneId);

      formProps.setValue('isActive', isActive);
      formProps.setValue('wlaApp', wlaApp);
      formProps.setValue('logo', logo);
      formProps.setValue('subDomain', subDomain);

      formProps.setValue('contactName', contactName);
      formProps.setValue('contactNumber', contactNumber);
      formProps.setValue('legalName', legalName);

      formProps.setValue('vat', vat);
      formProps.setValue('addresses', addresses);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const _handleSubmit = async (values: COMPANY_DETAILS) => {
    if (!isLastStep) {
      setActiveStep(activeStep + 1);
    } else {
      const value = {
        ...values,
        ...(id && { id }),
        currencyId: values?.currency,
        timeZoneId: values?.timeZone,
        // ...(id &&
        //   language && { language: language === 'English UK' ? '1' : '2' }),
      };
      const response: {
        error?: FetchBaseQueryError | SerializedError;
        data?: { [key: string]: string | number };
      } = await company(value);

      if (response.data) {
        router.push(`/companymanagement/company/${response?.data?.id ?? ''}`);
        alertService.success(id ? 'Updated!' : 'Created', {
          keepAfterRouteChange: true,
          autoClose: true,
        });
      }
    }
  };

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
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
