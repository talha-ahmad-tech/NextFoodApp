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
import { ADD_PRICELIST, PRICELIST_DETAILS } from '../types';
import { useDispatch } from 'react-redux';
import { setPriceList, setHeaderData } from '../pricelist.slice';
import { usePriceListLinesHook } from './SalesPriceListLines/LinesHooks';
import { TOGGLE_OPTIONS } from '@fridayfood/shared/components';
import Router from 'next/router';
import moment from 'moment';
const steps = ['General', 'lines'];

const FormFormEnhancer = (props?: ADD_PRICELIST) => {
  const [activeStep, setActiveStep] = useState(0);
  const { setActiveTab } = usePriceListLinesHook();
  const isLastStep = activeStep === steps.length - 1;
  const formProps = useForm<PRICELIST_DETAILS>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: formInitialValues,
  });
  const dispatch = useDispatch();

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  useEffect(() => {
    return (
      props?.id && formProps.setValue('priceType', props?.priceType),
      formProps.setValue('name', props?.name),
      formProps.setValue('description', props?.description),
      formProps.setValue('statusId', props?.status === 'Active' ? 1 : 2),
      formProps.setValue('status', props?.status as string),
      formProps.setValue(
        'dateFrom',
        moment(props?.dateFrom).format('YYYY-MM-DD'),
      ),
      formProps.setValue(
        'dateTill',
        moment(props?.dateTill).format('YYYY-MM-DD'),
      )
    );
  }, [props?.id]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function _handleSubmit(values?: PRICELIST_DETAILS) {
    const { priceType = 1 } = values || {};
    dispatch(setPriceList(Number(priceType)));
    dispatch(setHeaderData(Object(values)));
    setActiveTab(TOGGLE_OPTIONS.lines);
    // setActiveStep(activeStep + 1);
  }

  return (
    <div className="friday-vertical-tabs-container">
      <form onSubmit={formProps.handleSubmit(_handleSubmit)}>
        <div className="custom-tabs-wrapper custom-flex-start p-0 ">
          <div className="me-4">
            <TabsHeader
              Tabs={tabsConfiguration({
                priceType: 1,
              })}
              activeIndex={activeStep}
            />
          </div>
          <div className="friday-card card-shadow-1 border-radius-10 mb-4">
            <RenderStepContent step={activeStep} formData={formProps} />
          </div>
          <FormFooterActions
            activeStep={activeStep}
            handleBack={_handleBack}
            isLastStep={isLastStep}
            subButton
            subButtonTitle="Cancel"
            handleSubButton={() => {
              Router.push('/settings/pricelist');
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
