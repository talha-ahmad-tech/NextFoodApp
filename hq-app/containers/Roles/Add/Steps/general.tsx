import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { RolesApis } from 'services/modules/roles.api';
import { ChangeEvent } from 'react';

const General = ({
  formField,
  formData,
}: {
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

  const { name, isDefault, isPublic } = formField;

  return (
    <div>
      <Card Headertitle="General">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
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
              type="switch"
              {...register('isDefault')}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue('isDefault', e?.target.checked);
              }}
              checked={watch(isDefault.name)}
              label={isDefault.label}
              value={watch('isDefault')}
              defaultValue={false}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register('isPublic')}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue('isPublic', e?.target.checked);
              }}
              checked={watch(isPublic.name)}
              label={isPublic.label}
              value={watch('isPublic')}
              defaultValue={false}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
