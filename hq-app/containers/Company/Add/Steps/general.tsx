import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { CompanyApis } from 'services/modules/company.api';

const General = ({
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

  const {
    companyName,
    currency,
    language,
    whiteLabelApp,
    timeZone,
    active,
    logo,
    saleTaxGroupId,
    code,
  } = formField;

  return (
    <div>
      <Card Headertitle="General">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('companyName')}
              onChange={(e: { target: { value: string } }) =>
                setValue('companyName', e.target.value)
              }
              label={companyName.label}
              value={watch('companyName')}
              errorMessage={
                errors?.companyName ? errors?.companyName?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register(currency.name)}
              loadOptions={getOptions({
                endPoint: CompanyApis.CompanyItemGroup,
                method: 'get',
                key: 'currency',
                fieldsToShow: ['name'],
                v2: false,
                dataPickFromItems: true,
              })}
              inputValue={
                loadedOptionsFor['currency']
                  ? watch(currency.name)
                  : 'Select Item Group'
              }
              label={currency.label}
              onChange={onChangeOption('currency')}
              errorMessage={errors?.currency ? errors.currency?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register(language.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(language.name, e.target.value)
              }
              label={language.label}
              value={watch(language.name)}
              errorMessage={errors?.language ? errors.language?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register(whiteLabelApp.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(whiteLabelApp.name, e.target.value)
              }
              label={whiteLabelApp.label}
              value={watch(whiteLabelApp.name)}
              errorMessage={
                errors?.whiteLabelApp ? errors.whiteLabelApp?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              name={timeZone.name}
              label={timeZone.label}
              onChange={(e: { target: { value: string } }) =>
                setValue(timeZone.name, e.target.value)
              }
              value={watch(timeZone.name)}
              errorMessage={errors?.timeZone ? errors.timeZone?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register(active.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(active.name, e.target.value)
              }
              label={active.label}
              value={watch(active.name)}
              errorMessage={errors?.active ? errors?.active.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="file"
              {...register(logo.name)}
              label={logo.label}
              onChange={onChangeOption('logo')}
              errorMessage={errors?.logo ? errors?.logo.message : ''}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
