import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useRouter } from 'next/router';
// import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
// import { CompanyEndpoints } from 'services/modules/company.api';

const Contact = ({
  formField,
  formData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formField: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}) => {
  // const { getOptions, loadedOptionsFor } = useGetOptions();

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = formData;

  // const onChangeOption =
  //   (fieldName: string) => (value: { id: string | number }) => {
  //     setValue(fieldName, value.id);
  //   };

  const {
    contactName,
    contactNumber,
    adminEmailAddress,
    adminPassword,
    confirmPassword,
  } = formField;
  const router = useRouter();
  const { id = 0 } = router?.query;
  return (
    <div>
      <Card Headertitle="Contact">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('contactName')}
              onChange={(e: { target: { value: string } }) =>
                setValue('contactName', e.target.value)
              }
              label={contactName.label}
              value={watch('contactName')}
              errorMessage={
                errors?.contactName ? errors?.contactName?.message : ''
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
          {id ? null : (
            <>
              {' '}
              <div className="col-sm-12 col-md-6">
                <Field
                  type="text"
                  {...register(adminEmailAddress.name)}
                  onChange={(e: { target: { value: string } }) =>
                    setValue(adminEmailAddress.name, e.target.value)
                  }
                  label={adminEmailAddress.label}
                  value={watch(adminEmailAddress.name)}
                  errorMessage={
                    errors?.adminEmailAddress
                      ? errors.adminEmailAddress?.message
                      : ''
                  }
                  disabled={id ? true : false}
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="text"
                  {...register(adminPassword.name)}
                  onChange={(e: { target: { value: string } }) =>
                    setValue(adminPassword.name, e.target.value)
                  }
                  label={adminPassword.label}
                  value={watch(adminPassword.name)}
                  errorMessage={
                    errors?.adminPassword ? errors.adminPassword?.message : ''
                  }
                  disabled={id ? true : false}
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
                    errors?.confirmPassword
                      ? errors.confirmPassword?.message
                      : ''
                  }
                  disabled={id ? true : false}
                />
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};
export default Contact;
