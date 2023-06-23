/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormFormModel } from '../FormConfig/formModel';
import General from './general';
import { UseFormReturn } from 'react-hook-form/dist/types';

const { formField } = FormFormModel;
export const RenderStepContent = ({
  step,
  formData,
}: {
  step: number;
  formData: UseFormReturn<any>;
}) => {
  switch (step) {
    case 0:
      return <General formField={formField} formData={formData} />;
    default:
      return <div>Not Found</div>;
  }
};
