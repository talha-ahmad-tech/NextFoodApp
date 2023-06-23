import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import type {
  FieldValues,
  UseFormReturn,
  WatchObserver,
} from 'react-hook-form/dist/types';
import { ORDER_SOURCE, PAYMENT_METHOD_FORM_TAB } from '../../types';
// import { useGetOptions } from '@/utils/customHooks/useGetOtions';
// import { PaymentApis } from 'services/modules/payment.api';

const General = ({
  formField,
  formData,
}: {
  formField: PAYMENT_METHOD_FORM_TAB;
  formData: UseFormReturn;
}) => {
  // const { getOptions, loadedOptionsFor } = useGetOptions();
  const {
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = formData;

  const {
    code = {},
    name = {},
    description = {},
    position = {},
    orderSource,
  } = formField;
  const {
    name: pname = '',
    label: plabel,
    options,
  } = orderSource || ({} as ORDER_SOURCE);

  return (
    <div>
      <Card noCardWrapper Headertitle="General">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              {...register(code.name as string)}
              label={code.label}
              value={
                watch(code.name as unknown as WatchObserver<FieldValues>) ?? '-'
              }
              disabled
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              {...register(name.name as string)}
              onChange={(e: { target: { value: string } }) => {
                setValue('name', e.target.value);
                clearErrors(['name']);
              }}
              placeholder="Enter"
              label={name.label}
              value={watch(name.name as unknown as WatchObserver<FieldValues>)}
              errorMessage={errors?.name ? errors?.name?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              placeholder="Enter"
              {...register(description.name as string)}
              onChange={(e: { target: { value: string } }) => {
                setValue('description', e.target.value);
                clearErrors(['description']);
              }}
              label={description.label}
              value={watch(
                description.name as unknown as WatchObserver<FieldValues>,
              )}
              errorMessage={
                errors?.description ? errors.description?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              placeholder="Enter"
              {...register(position.name as string)}
              onChange={(e: { target: { value: string } }) => {
                setValue('position', e.target.value);
                clearErrors(['position']);
              }}
              label={position.label}
              value={watch(
                position.name as unknown as WatchObserver<FieldValues>,
              )}
              errorMessage={errors?.position ? errors.position?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register(pname)}
              options={options}
              label={plabel}
              value={watch(
                orderSource?.name as unknown as WatchObserver<FieldValues>,
              )}
              onChange={(e: { [key: string]: string }) => {
                setValue('orderSource', e?.value);
                clearErrors(['orderSource']);
              }}
              defaultInputValue={watch('orderSource')}
              errorMessage={
                errors?.orderSource ? errors.orderSource?.message : ''
              }
              clear
              closeMenuOnSelect
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
