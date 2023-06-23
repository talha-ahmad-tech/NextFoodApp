import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { UseFormReturn } from 'react-hook-form/dist/types';

const General = ({
  formField,
  formData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formField: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}) => {
  const { register, watch, setValue } = formData;

  const { allowTableOrder, noOfTable } = formField;

  return (
    <div>
      <Card Headertitle="General">
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <Field
              type="switch"
              {...register('allowTableOrder')}
              onChange={(e: { target: { checked: boolean } }) =>
                setValue('allowTableOrder', e.target.checked)
              }
              label={allowTableOrder.label}
              value={watch('allowTableOrder')}
            />
          </div>
          {watch('allowTableOrder') && (
            <div className="col-sm-12 col-md-8">
              <Field
                name={noOfTable.name}
                label={noOfTable.label}
                placeholder="Enter"
                onChange={(e: { target: { value: string } }) =>
                  setValue(noOfTable.name, e.target.value)
                }
                value={watch(noOfTable.name)}
              />
            </div>
          )}
        </div>
        <div className="border" />
      </Card>
    </div>
  );
};
export default General;
