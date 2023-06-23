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
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = formData;

  const { name = '', description = '' } = formField;

  return (
    <div>
      <Card Headertitle="General">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              placeholder="Enter"
              type="text"
              {...register('name')}
              onChange={(e: { target: { value: string } }) =>
                setValue('name', e.target.value)
              }
              label={name.label}
              value={watch('name')}
              errorMessage={errors?.name ? errors?.name?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              placeholder="Enter"
              name={description.name}
              label={description.label}
              onChange={(e: { target: { value: string } }) =>
                setValue(description.name, e.target.value)
              }
              value={watch(description.name)}
              errorMessage={
                errors?.description ? errors.description?.message : ''
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
