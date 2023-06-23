import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { CompanyEndpoints } from 'services/modules/company.api';
import FileUploader from 'components/FileUploader';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { CustomFieldComponent } from '@fridayfood/shared/components';

const General = ({
  formField,
  formData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formField: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { getOptions } = useGetOptions();
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = formData;

  const {
    name,
    currencyId,
    language,

    wlaApp,
    timeZoneId,
    isActive,
    logo,
    subDomain,
  } = formField;

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
              type="options"
              {...register(currencyId.name)}
              loadOptions={getOptions({
                endPoint: CompanyEndpoints.CurrencyLookup,
                method: 'get',
                key: 'currencyId',
                fieldsToShow: ['name'],
                dataPickFromItems: true,
                baseURLType: 'core',
              })}
              inputValue={watch(currencyId.name)}
              label={currencyId.label}
              onChange={(e: { label: string; value: number }) => {
                setValue(currencyId.name, e.value);
                setValue('currency', e.value);
              }}
              errorMessage={
                errors?.currencyId ? errors.currencyId?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <CustomFieldComponent
              control={control}
              type="select"
              {...register('language')}
              options={language.options}
              label={language.label}
              name={language.name}
              value={watch('language')}
              onChange={(e: { id?: number }) => {
                setValue('language', e?.id);
              }}
              defaultValue={{
                // name: watch(language.name),
                name: language.options[Number(watch(language.name)) - 1],
                value: watch(language.name),
              }}
              closeMenuOnSelect
              errorMessage={errors?.language ? errors?.language?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register(wlaApp.name)}
              onChange={(e: { target: { checked: boolean } }) =>
                setValue(wlaApp.name, e.target.checked)
              }
              label={wlaApp.label}
              checked={watch(wlaApp.name)}
              errorMessage={errors?.wlaApp ? errors.wlaApp?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="options"
              {...register(timeZoneId.name)}
              loadOptions={getOptions({
                endPoint: CompanyEndpoints.timeZone,
                method: 'get',
                key: 'timeZoneId',
                fieldsToShow: ['name'],
                dataPickFromItems: true,
                baseURLType: 'core',
              })}
              inputValue={watch(timeZoneId.name)}
              label={timeZoneId.label}
              onChange={(value: { name: string; id: number }) => {
                setValue(timeZoneId.name, value?.id);
                setValue('timeZone', value?.id);
              }}
              errorMessage={
                errors?.timeZoneId ? errors.timeZoneId?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register(isActive.name)}
              onChange={(e: { target: { checked: boolean } }) =>
                setValue(isActive.name, e.target.checked)
              }
              label={isActive.label}
              checked={watch(isActive.name)}
              errorMessage={errors?.isActive ? errors?.isActive.message : ''}
            />
          </div>
          <div
            className={`col-sm-12 
              ${loading ? 'col-md-4' : 'col-md-6'}
              `}
          >
            <FileUploader
              type="file"
              {...register(logo.name)}
              appType="core"
              accept="image/png, image/jpeg"
              endPoint="file-handler/upload-resource"
              name={logo.name}
              label={logo.label}
              resourceType="1"
              changeUrl={async (value: string) => {
                setValue('logo', await value);
              }}
              setLoading={setLoading}
              errorMessage={errors?.imageUrl ? errors.imageUrl?.message : ''}
            />
          </div>
          <>
            {loading ? (
              <div className="col-sm-12 col-md-1">
                <Spinner />
              </div>
            ) : null}
          </>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('subDomain')}
              onChange={(e: { target: { value: string } }) =>
                setValue('subDomain', e.target.value)
              }
              label={subDomain.label}
              value={watch('subDomain')}
              errorMessage={errors?.subDomain ? errors?.subDomain?.message : ''}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
