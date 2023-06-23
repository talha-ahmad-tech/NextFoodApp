import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
// import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
// import { CompanyApis } from 'services/modules/company.api';

const LegalEntity = ({
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

  const { legalName, vat } = formField;

  return (
    <div>
      <Card Headertitle="Legal Entity">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('legalName')}
              onChange={(e: { target: { value: string } }) =>
                setValue('legalName', e.target.value)
              }
              label={legalName.label}
              value={watch('legalName')}
              errorMessage={errors?.legalName ? errors?.legalName?.message : ''}
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(vat.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(vat.name, e.target.value)
              }
              label={vat.label}
              value={watch(vat.name)}
              errorMessage={errors?.vat ? errors.vat?.message : ''}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default LegalEntity;
