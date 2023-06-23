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
import { ADD_TABLEORDERING, ADD_UPDATE_TABLEORDERING } from '../types';

const FormFormEnhancer = ({   allowTableOrder ,
  noOfTable, id,  tableorderingDetails={} }: ADD_UPDATE_TABLEORDERING) => {
  const [activeStep, setActiveStep] = useState(0);

  const formProps = useForm<ADD_TABLEORDERING>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: formInitialValues,
  });

  useEffect(() => {
    if (id === undefined) {
      formProps.setValue('allowTableOrder', allowTableOrder);
      formProps.setValue('noOfTable', noOfTable);
    } else {
      formProps.setValue('allowTableOrder', tableorderingDetails.allowTableOrder);
      formProps.setValue('noOfTable', tableorderingDetails.noOfTable);
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
            isLastStep={true}
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
