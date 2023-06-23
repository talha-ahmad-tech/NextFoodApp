import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import {
  useGetOptions,
  useSelectionGetter,
} from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { discountApi } from 'services/modules/discount.api';
import {
  CustomFieldComponent,
  ListHeaderWrapper,
} from '@fridayfood/shared/components';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ProductComponent from './components/productsComponent';
import DateAndTimeComponent from './components/dateAndTimeComponent';
import LocationComponent from './components/locationComponent';

const General = ({
  formField,
  formData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formField: { [key: string]: any };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}) => {
  const { formattedOptions } = useGetOptions();

  const {
    register,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = formData;

  const {
    orderSource,
    discountCategory,
    discountName,
    discountCode,
    discountType,
    voucherLimit,
    category,
    amount,
    products,
    itemGroups,
    stores,
    customerLimit,
    maximumAmount,
    maximumLimit,
    startDate,
    endDate,
    startTime,
    endTime,
  } = formField;

  const storesOptions = useSelectionGetter({
    endPoint: discountApi.stores,
    method: 'GET',
    key: 'stores',
    fieldsToShow: ['name'],
    baseURLType: 'core',
    simpleOptions: true,
  });

  const [DiscountCategoryValue, setDiscountCategoryValue] = useState<number>(0);
  useEffect(() => {
    setDiscountCategoryValue(getValues(discountCategory.name));
  }, [getValues(discountCategory.name)]);

  return (
    <div>
      <Card Headertitle="Discount Type">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType={'list'}
              {...register('orderSource')}
              label={orderSource.label}
              onChange={(e: { value: string }) =>
                setValue('orderSource', e.value)
              }
              closeMenuOnSelect
              options={orderSource.options}
              value={watch('orderSource')}
              errorMessage={
                errors?.orderSource ? errors?.orderSource?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register('discountCategory')}
              label={discountCategory.label}
              onChange={(e: { value: string }) => {
                console.log('E', e.value);
                setValue('discountCategory', e.value);
              }}
              closeMenuOnSelect
              options={discountCategory.options}
              value={watch('discountCategory')}
              errorMessage={
                errors?.discountCategory
                  ? errors?.discountCategory?.message
                  : ''
              }
            />
          </div>

          {DiscountCategoryValue && (
            <>
              {' '}
              <div className="col-sm-12 col-md-6">
                <Field
                  type="text"
                  {...register('discountName')}
                  placeholder={'Enter'}
                  label={discountName.label}
                  onChange={(e: { target: { value: string } }) =>
                    setValue('discountName', e.target.value)
                  }
                  options={discountName.options}
                  value={watch('discountName')}
                  errorMessage={
                    errors?.discountName ? errors?.discountName?.message : ''
                  }
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="text"
                  label={discountCode.label}
                  disabled
                  value={'DEMO-000CODE'}
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="select"
                  {...register('discountType')}
                  label={discountType.label}
                  onChange={(e: { value: string }) =>
                    setValue('discountType', e.value)
                  }
                  closeMenuOnSelect
                  options={discountType.options}
                  value={watch('discountType')}
                  errorMessage={
                    errors?.discountType ? errors?.discountType?.message : ''
                  }
                />
              </div>
              <div className="col-sm-12 col-md-6"></div>
            </>
          )}

          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="listWithCount"
              {...register(stores.name)}
              options={storesOptions}
              defaultValue={formattedOptions(
                watch(stores.name)?.length ? watch(stores.name) : [],
              )}
              label={stores.label}
              onChange={(e?: Array<object>) => {
                const storeData = e?.map(
                  (item: { id?: string; name?: string }) => {
                    return {
                      storeId: item?.id,
                      storeName: item?.name,
                    };
                  },
                );
                // setValue('discountStoreId', Ids);
                setValue(stores.name, storeData);
              }}
              errorMessage={errors?.stores ? errors.stores?.message : ''}
            />
          </div>
          {DiscountCategoryValue === 1 && (
            <>
              <div className="col-sm-12 col-md-6">
                <CustomFieldComponent
                  control={control}
                  {...register(startDate.name)}
                  min={moment(watch(startDate.name)).format('YYYY-MM-DD')}
                  onChange={(e: { target: { value: string } }) =>
                    setValue(startDate.name, e.target.value)
                  }
                  name={startDate.name}
                  label={startDate.label}
                  inputValue={watch(startDate.name)}
                  errorMessage={
                    errors?.startDate ? errors.startDate?.message : ''
                  }
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="switch"
                  {...register('discountType')}
                  label={discountType.label}
                  onChange={(e: { checked: boolean }) =>
                    setValue('discountType', e.checked)
                  }
                  closeMenuOnSelect
                  options={discountType.options}
                  value={watch('discountType')}
                  errorMessage={
                    errors?.discountType ? errors?.discountType?.message : ''
                  }
                />
              </div>
            </>
          )}
          {DiscountCategoryValue === 2 ||
          DiscountCategoryValue === 3 ||
          DiscountCategoryValue === 4 ? (
            <>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="text"
                  {...register('customerLimit')}
                  label={customerLimit.label}
                  onChange={(e: { target: { value: string } }) =>
                    setValue('customerLimit', parseInt(e.target.value))
                  }
                  placeholder={'Enter'}
                  value={watch('customerLimit')}
                  errorMessage={
                    errors?.customerLimit ? errors?.customerLimit?.message : ''
                  }
                />
              </div>
              {DiscountCategoryValue === 3 || DiscountCategoryValue === 4 ? (
                <div className="col-sm-12 col-md-6">
                  <Field
                    type="text"
                    {...register('voucherLimit')}
                    label={voucherLimit.label}
                    onChange={(e: { target: { value: string } }) =>
                      setValue('voucherLimit', parseInt(e.target.value))
                    }
                    placeholder={'Enter'}
                    value={watch('voucherLimit')}
                    errorMessage={
                      errors?.voucherLimit ? errors?.voucherLimit?.message : ''
                    }
                  />
                </div>
              ) : null}
              <div className="col-sm-12 col-md-6">
                <Field
                  type="text"
                  {...register('maximumLimit')}
                  label={maximumLimit.label}
                  onChange={(e: { target: { value: string } }) =>
                    setValue('maximumLimit', parseInt(e.target.value))
                  }
                  placeholder={'Enter'}
                  value={watch('maximumLimit')}
                  errorMessage={
                    errors?.maximumLimit ? errors?.maximumLimit?.message : ''
                  }
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="switch"
                  {...register('discountType')}
                  label={discountType.label}
                  onChange={(e: { checked: boolean }) =>
                    setValue('discountType', e.checked)
                  }
                  closeMenuOnSelect
                  options={discountType.options}
                  value={watch('discountType')}
                  errorMessage={
                    errors?.discountType ? errors?.discountType?.message : ''
                  }
                />
              </div>
              <hr />
              <LocationComponent formField={formField} formData={formData} />
              <hr />
              <ProductComponent formField={formField} formData={formData} />
              <hr />

              <DateAndTimeComponent formField={formField} formData={formData} />
            </>
          ) : null}

          {/* <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('amount')}
              label={amount.label}
              onChange={(e: { target: { value: string } }) => {
                setValue('amount', e.target.value);
              }}
              value={watch('amount')}
              errorMessage={errors?.amount ? errors?.amount?.message : ''}
            />
          </div>

         
         
        
         
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('maximumAmount')}
              label={maximumAmount.label}
              onChange={(e: { target: { value: string } }) =>
                setValue('maximumAmount', parseInt(e.target.value))
              }
              value={watch('maximumAmount')}
              errorMessage={
                errors?.maximumAmount ? errors?.maximumAmount?.message : ''
              }
            />
          </div>
         
          */}
        </div>
      </Card>
    </div>
  );
};
export default General;
