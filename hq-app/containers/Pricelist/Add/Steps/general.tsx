import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { UseFormReturn } from 'react-hook-form/dist/types';

import { CustomFieldComponent } from '@fridayfood/shared/components';
import { PRICELIST_FORM, PRICE_TYPE } from '../../types';
import { useState } from 'react';

const General = ({
  formField,
  formData,
}: {
  formField: PRICELIST_FORM;
  formData: UseFormReturn;
}) => {
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = formData;

  const {
    priceType,
    name,
    description,
    status,
    dateFrom = {},
    dateTill = {},
  } = formField;
  const {
    name: pname = '',
    label: plabel,
    options,
  } = priceType || ({} as PRICE_TYPE);
  const [statusOptions, setStatusOptions] = useState([
    { name: 'Active', id: 1, value: 1 },
    { name: 'InActive', id: 2, value: 2 },
  ]);
  return (
    <div>
      <Card Headertitle="General">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register(pname)}
              options={options}
              label={plabel}
              onChange={(e: { [key: string]: string }) =>
                setValue('priceType', e?.value)
              }
              clear
              closeMenuOnSelect
              value={watch('priceType')}
              errorMessage={errors?.priceType ? errors.priceType?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('name')}
              onChange={(e: { target: { value: string } }) =>
                setValue('name', e.target.value)
              }
              label={name?.label}
              value={watch('name')}
              errorMessage={errors?.name ? errors?.name?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('description')}
              onChange={(e: { target: { value: string } }) =>
                setValue('description', e.target.value)
              }
              label={description?.label}
              value={watch('description')}
              errorMessage={
                errors?.description ? errors?.description?.message : ''
              }
            />
          </div>{' '}
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register('status')}
              onChange={(e: { [key: string]: string | number }) => {
                setValue('status', e?.name);
                setValue('statusId', e?.id as number);
              }}
              closeMenuOnSelect
              options={statusOptions}
              label={status?.label}
              value={watch('statusId')}
              errorMessage={errors?.status ? errors?.status?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <CustomFieldComponent
              type="date"
              control={control}
              {...register(dateFrom?.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(dateFrom?.name, e.target.value)
              }
              label={dateFrom.label}
              value={watch(dateFrom.name)}
              errorMessage={errors?.dateFrom ? errors.dateFrom?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <CustomFieldComponent
              control={control}
              {...register(dateTill.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(dateTill.name, e.target.value)
              }
              name={dateTill.name}
              label={dateTill.label}
              value={watch(dateTill.name)}
              errorMessage={errors?.dateTill ? errors.dateTill?.message : ''}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
