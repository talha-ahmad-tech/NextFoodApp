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
import { ADD_FOOD_COSTING, ADD_UPDATE_FOOD_COSTING } from '../types';
const steps = ['General', 'foodCostingOrder'];

const FormFormEnhancer = ({ code, id, foodCostingDetails={} }: ADD_UPDATE_FOOD_COSTING) => {
  const [activeStep, setActiveStep] = useState(0);

  const isLastStep = activeStep === steps.length - 1;
  const formProps = useForm<ADD_FOOD_COSTING>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: formInitialValues,
  });

  useEffect(() => {
    if (id === undefined) {
      formProps.setValue('code', code);
    } else {
      formProps.setValue('code', foodCostingDetails.code);
      formProps.setValue('foodCostingName', foodCostingDetails.foodCostingName);
      formProps.setValue('itemGroupId', foodCostingDetails.itemGroupId);
      formProps.setValue('activeFrom', foodCostingDetails.activeFrom);
      formProps.setValue('activeTo', foodCostingDetails.activeTo);
      formProps.setValue('activeTo', foodCostingDetails.activeTo);
      formProps.setValue('standardCost', foodCostingDetails.standardCost);
      formProps.setValue('totalRetailPrice', foodCostingDetails.totalRetailPrice);
      formProps.setValue('purchaseTaxGroupId', foodCostingDetails.purchaseTaxGroupId);
      formProps.setValue('saleTaxGroupId', foodCostingDetails.saleTaxGroupId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  function _handleSubmit() {
    setActiveStep(activeStep + 1);
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
            isLastStep={isLastStep}
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
