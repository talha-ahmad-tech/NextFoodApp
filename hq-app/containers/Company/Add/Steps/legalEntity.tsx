import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { CompanyApis } from 'services/modules/company.api';

const LegalEntity = ({
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

  const { legalCompanyName, legalVATNumber } = formField;

  return (
    <div>
      <Card Headertitle="Legal Entity">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('legalCompanyName')}
              onChange={(e: { target: { value: string } }) =>
                setValue('legalCompanyName', e.target.value)
              }
              label={legalCompanyName.label}
              value={watch('legalCompanyName')}
              errorMessage={
                errors?.legalCompanyName
                  ? errors?.legalCompanyName?.message
                  : ''
              }
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(legalVATNumber.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(legalVATNumber.name, e.target.value)
              }
              label={legalVATNumber.label}
              value={watch(legalVATNumber.name)}
              errorMessage={
                errors?.legalVATNumber ? errors.legalVATNumber?.message : ''
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default LegalEntity;
