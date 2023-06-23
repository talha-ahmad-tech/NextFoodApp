import { FormFormModel } from '../FormConfig/formModel';
import General from './general';
import { UseFormReturn } from 'react-hook-form/dist/types';
import AddAddress from 'components/AddAddress';

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
      return <General formField={formField} formData={formData} />;
    case 1:
      return (
        <AddAddress
          employ={true}
          setAddressValue={formData}
          fieldToSet="addresses"
        />
      );

    default:
      return <div>Not Found</div>;
  }
};
