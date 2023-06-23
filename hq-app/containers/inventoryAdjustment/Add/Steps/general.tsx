/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { StoresApis } from 'services/modules/stores.api';
import { CustomFieldComponent } from '@fridayfood/shared/components';
import { inventoryAdjustmentEndpoints } from 'services/modules/inventoryAdjustment.api';

const General = ({
  formField,
  formData,
}: {
  formField: { [key: string]: any };
  formData: UseFormReturn<any>;
}) => {
  const { getOptions, formattedOptions } = useGetOptions();
  const {
    register,
    watch,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = formData;

  const {
    name,
    description,
    date,
    time,
    reason,
    documentReference,
    supplierId,
    storeId,
  } = formField;

  return (
    <div>
      <Card Headertitle="General">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              {...register(name.name)}
              label={name.label}
              value={watch(name.name)}
              placeholder="Enter"
              errorMessage={errors.name ? errors.name?.message : ''}
              onChange={(e: { target: { value: string } }) => {
                setValue('name', e.target.value);
                clearErrors(['name']);
              }}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('description')}
              onChange={(e: { target: { value: string } }) => {
                setValue('description', e.target.value);
                clearErrors(['description']);
              }}
              placeholder="Enter"
              label={description.label}
              value={watch('description')}
              errorMessage={
                errors?.description ? errors?.description?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <CustomFieldComponent
              type="date"
              control={control}
              {...register(date?.name)}
              onChange={(e: { target: { value: string } }) => {
                setValue(date.name, e.target.value);
                clearErrors(['date']);
              }}
              label={date.label}
              value={watch(date.name)}
              errorMessage={errors?.date ? errors.date?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <CustomFieldComponent
              type="time"
              control={control}
              {...register(time?.name)}
              onChange={(e: { target: { value: string } }) => {
                setValue(time?.name, e.target.value);
                clearErrors(['time']);
              }}
              label={time.label}
              value={watch(time.name)}
              errorMessage={errors?.dateFrom ? errors.dateFrom?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              name={reason.name}
              label={reason.label}
              onChange={(e: { name: string; value: number }) => {
                setValue(reason.name, e?.value);
                clearErrors([reason?.name]);
              }}
              options={reason?.reasonOptions}
              value={watch(reason.name)}
              errorMessage={errors?.reason ? errors.reason?.message : ''}
              clear
              closeMenuOnSelect
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              {...register(documentReference.name)}
              onChange={(e: { target: { value: string } }) => {
                setValue(documentReference.name, e.target.value);
                clearErrors([documentReference?.name]);
              }}
              label={documentReference.label}
              value={watch(documentReference.name)}
              errorMessage={
                errors?.documentReference
                  ? errors?.documentReference.message
                  : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="options"
              componentType="list"
              {...register('supplier')}
              loadOptions={getOptions({
                endPoint: inventoryAdjustmentEndpoints.supplierLookup,
                method: 'get',
                key: 'name',
                fieldsToShow: ['name'],
                dataPickFromItems: true,
                baseURLType: 'core',
              })}
              inputValue={formattedOptions(
                watch(supplierId.name)?.length ? watch(supplierId.name) : [],
              )}
              label={supplierId?.label}
              name={supplierId?.name}
              onChange={(props: { id: string | number; name: string }) => {
                setValue('supplierId', Number(props?.id));
                setValue('supplierName', props?.name);

                clearErrors(['supplierId']);
              }}
              // errorMessage={
              //   errors?.supplierId ? errors.supplierId?.message : ''
              // }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="options"
              componentType="list"
              {...register('store')}
              loadOptions={getOptions({
                endPoint: StoresApis.storeLookup,
                method: 'get',
                key: 'store',
                fieldsToShow: ['name'],
                dataPickFromItems: true,
                baseURLType: 'core',
              })}
              inputValue={formattedOptions(
                watch(storeId.name)?.length ? watch(storeId.name) : [],
              )}
              label={storeId?.label}
              name={storeId?.name}
              onChange={(props: { id: string | number; name: string }) => {
                setValue('storeId', Number(props?.id));
                setValue('storeName', Number(props?.name));
                clearErrors(['storeId']);
              }}
              errorMessage={errors?.storeId ? errors.storeId?.message : ''}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
