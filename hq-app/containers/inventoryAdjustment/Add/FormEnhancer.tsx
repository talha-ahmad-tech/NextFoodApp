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
import {
  ADD_INVENTORY_ADJUSTMENT_NEW,
  INVENTORY_ADJUSTMENT_DETAIL,
} from '../types';
import { useDispatch } from 'react-redux';
import { setInventoryAdjustmentHeader } from '../inventoryAdjustment.slice';
import { TOGGLE_OPTIONS } from '@fridayfood/shared/components';
import { useInventoryAdjustment } from './InventoryAdjustmentLines/useInventoryAdjustment';

const FormFormEnhancer = ({
  id,
  inventoryAdjustmentNewDetails = {},
}: INVENTORY_ADJUSTMENT_DETAIL) => {
  const [activeStep, setActiveStep] = useState(0);
  const { setActiveTab } = useInventoryAdjustment();
  const dispatch = useDispatch();

  const formProps = useForm<ADD_INVENTORY_ADJUSTMENT_NEW>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: formInitialValues,
  });

  useEffect(() => {
    if (id) {
      formProps.setValue('code', inventoryAdjustmentNewDetails.code);
      formProps.setValue(
        'inventoryAdjustmentNewName',
        inventoryAdjustmentNewDetails.inventoryAdjustmentNewName,
      );
      formProps.setValue(
        'itemGroupId',
        inventoryAdjustmentNewDetails.itemGroupId,
      );
      formProps.setValue(
        'activeFrom',
        inventoryAdjustmentNewDetails.activeFrom,
      );
      formProps.setValue('activeTo', inventoryAdjustmentNewDetails.activeTo);
      formProps.setValue('activeTo', inventoryAdjustmentNewDetails.activeTo);
      formProps.setValue(
        'standardCost',
        inventoryAdjustmentNewDetails.standardCost,
      );
      formProps.setValue(
        'totalRetailPrice',
        inventoryAdjustmentNewDetails.totalRetailPrice,
      );
      formProps.setValue(
        'purchaseTaxGroupId',
        inventoryAdjustmentNewDetails.purchaseTaxGroupId,
      );
      formProps.setValue(
        'saleTaxGroupId',
        inventoryAdjustmentNewDetails.saleTaxGroupId,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  function _handleSubmit(values?: INVENTORY_ADJUSTMENT_DETAIL) {
    dispatch(setInventoryAdjustmentHeader(Object(values)));
    setActiveTab(TOGGLE_OPTIONS.lines);
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
            isLastStep={false}
          />
        </div>
      </form>
    </div>
  );
};

export default FormFormEnhancer;
