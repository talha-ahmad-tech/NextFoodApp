import AddressDetailsForm from 'components/AddAddress';
import { FormFormModel } from '../FormConfig/formModel';
import General from './general';
import { UseFormReturn } from 'react-hook-form/dist/types';
import LegalEntity from './legalEntity';
import Contact from './contact';

const { formField } = FormFormModel;
export const RenderStepContent = ({
  step,
  formData,
}: {
  step: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}) => {
  switch (step) {
    case 0:
      return <General formField={formField} formData={formData} />;
    case 1:
      return (
        <AddressDetailsForm fieldToSet="addresses" setAddressValue={formData} />
      );
    case 2:
      return <LegalEntity formField={formField} formData={formData} />;
    case 3:
      return <Contact formField={formField} formData={formData} />;
    default:
      return <div>Not Found</div>;
  }
};
