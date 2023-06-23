import { useState } from 'react';
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
import { ADD_COMPANY, ADD_UPDATE_COMPANY } from '../types';
const steps = ['General', 'Address', 'Legal Entity', 'Contact'];

const FormFormEnhancer = ({}: // code,
// id,
// companyDetails = {},
ADD_UPDATE_COMPANY) => {
  const [activeStep, setActiveStep] = useState(0);

  const isLastStep = activeStep === steps.length - 1;
  const formProps = useForm<ADD_COMPANY>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: formInitialValues,
  });

  // useEffect(() => {
  //   if (id === undefined) {
  //     formProps.setValue('code', code);
  //   } else {
  //     formProps.setValue('code', companyDetails.code);
  //     formProps.setValue('companyName', companyDetails.companyName);
  //     formProps.setValue('itemGroupId', companyDetails.itemGroupId);
  //     formProps.setValue('activeFrom', companyDetails.activeFrom);
  //     formProps.setValue('activeTo', companyDetails.activeTo);
  //     formProps.setValue('activeTo', companyDetails.activeTo);
  //     formProps.setValue('standardCost', companyDetails.standardCost);
  //     formProps.setValue('totalRetailPrice', companyDetails.totalRetailPrice);
  //     formProps.setValue(
  //       'purchaseTaxGroupId',
  //       companyDetails.purchaseTaxGroupId,
  //     );
  //     formProps.setValue('saleTaxGroupId', companyDetails.saleTaxGroupId);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const { getValues } = formProps;
  const allValues = getValues();

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  function _handleSubmit() {
    isLastStep
      ? console.log('PAYLOAd', allValues)
      : setActiveStep(activeStep + 1);
  }

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
            handleSave={_handleSubmit}
            isLastStep={isLastStep}
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
