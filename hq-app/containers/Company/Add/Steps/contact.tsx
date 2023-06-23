import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { CompanyApis } from 'services/modules/company.api';

const Contact = ({
  formField,
  formData,
}: {
  formField: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}) => {
  const { getOptions, loadedOptionsFor } = useGetOptions();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = formData;

  const onChangeOption =
    (fieldName: string) => (value: { id: string | number }) => {
      setValue(fieldName, value.id);
    };

  const { companyName, contactNumber, email, password, confirmPassword } =
    formField;

  return (
    <div>
      <Card Headertitle="Contact">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('name')}
              onChange={(e: { target: { value: string } }) =>
                setValue('name', e.target.value)
              }
              label={companyName.label}
              value={watch('name')}
              errorMessage={
                errors?.companyName ? errors?.companyName?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(contactNumber.name)}
              label={contactNumber.label}
              onChange={(e: { target: { value: string } }) =>
                setValue('contactNumber', e.target.value)
              }
              value={watch(contactNumber.name)}
              errorMessage={
                errors?.contactNumber ? errors.contactNumber?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(email.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(email.name, e.target.value)
              }
              label={email.label}
              value={watch(email.name)}
              errorMessage={errors?.email ? errors.email?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(password.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(password.name, e.target.value)
              }
              label={password.label}
              value={watch(password.name)}
              errorMessage={errors?.password ? errors.password?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(confirmPassword.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(confirmPassword.name, e.target.value)
              }
              label={confirmPassword.label}
              value={watch(confirmPassword.name)}
              errorMessage={
                errors?.confirmPassword ? errors.confirmPassword?.message : ''
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Contact;
