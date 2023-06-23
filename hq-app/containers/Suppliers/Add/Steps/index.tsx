import AddAddress from 'components/AddAddress';
import { FormFormModel } from '../FormConfig/formModel';
import General from './general';
import { UseFormReturn } from 'react-hook-form/dist/types';

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
        <AddAddress
          setAddressValue={formData}
          fieldToSet="addresses"
          simpleAddress={true}
        />
      );
    default:
      return <div>Not Found</div>;
  }
};
