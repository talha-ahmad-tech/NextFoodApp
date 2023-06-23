import { FormFormModel } from '../FormConfig/formModel';
import Stores from './stores';
import StoreAddress from './address';
import { UseFormReturn } from 'react-hook-form/dist/types';

const { formField } = FormFormModel;
export const RenderStepContent = ({
  step,
  formData,
}: {
  step: number;
  formData: UseFormReturn;
}) => {
  switch (step) {
    case 0:
      return <Stores formField={formField} formData={formData} />;
    case 1:
      return <StoreAddress formField={formField} formData={formData} />;
    default:
      return <div></div>;
  }
};
