import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import {
  useGetOptions,
  useSelectionGetter,
} from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { discountApi } from 'services/modules/discount.api';
import { useEffect } from 'react';
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
  const { formattedOptions } = useGetOptions();

  const {
    register,
    getValues,
    watch,
    setValue,
    control,
    formState: { errors },
  } = formData;

  const {
    name,
    code,
    type,
    amount,
    products,
    itemGroups,
    stores,
    customerLimit,
    maximumAmount,
    maximumLimit,
    startDate,
    endDate,
  } = formField;

  const itemsGroupOptions = useSelectionGetter({
    endPoint: discountApi.itemGroups,
    method: 'GET',
    key: 'itemGroups',
    fieldsToShow: ['name'],
    baseURLType: 'admin',
    dataPickFromItems: true,
  });

  const discountCodeOptions = useSelectionGetter({
    endPoint: discountApi.products,
    method: 'get',
    key: 'products',
    fieldsToShow: ['name'],
    baseURLType: 'admin',
    dataPickFromItems: true,
    isFiltered: true,
  });
  const discountStoreOptions = useSelectionGetter({
    endPoint: discountApi.stores,
    method: 'GET',
    key: 'stores',
    fieldsToShow: ['name'],
    baseURLType: 'admin',
    simpleOptions: true,
  });

  const productsValues = getValues();
  let productOptions = productsValues?.discountProducts || [];
  productOptions = productOptions?.map(
    (items: { productId?: string }) => items?.productId,
  );
  let itemGroupOptions = productsValues?.discountItemGroups || [];

  itemGroupOptions = itemGroupOptions?.map(
    (items: { itemGroupId?: string }) => items?.itemGroupId,
  );
  let storeOptions = productsValues?.discountStores || [];

  storeOptions = storeOptions?.map(
    (items: { storeId?: string }) => items?.storeId,
  );

  useEffect(() => {
    setValue('discountProductId', productOptions);
    setValue('discountItemsGroupId', itemGroupOptions);
    setValue('discountStoreId', storeOptions);
    setValue(stores.name, formattedOptions(productsValues?.discountStores));
    setValue(
      itemGroups.name,
      formattedOptions(productsValues?.discountItemGroups),
    );
    setValue(products.name, formattedOptions(productsValues?.discountProducts));
  }, []);
  return (
    <div>
      <Card Headertitle="Discount Code">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('name')}
              label={name.label}
              onChange={(e: { target: { value: string } }) =>
                setValue('name', e.target.value)
              }
              value={watch('name')}
              errorMessage={errors?.name ? errors?.name?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('code')}
              label={code.label}
              onChange={(e: { target: { value: string } }) =>
                setValue('code', e.target.value)
              }
              value={watch('code')}
              errorMessage={errors?.code ? errors?.code?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              options={type.options}
              // clear
              closeMenuOnSelect
              label={type.label}
              value={watch(type.name)}
              onChange={(e?: { value?: string }) => {
                setValue('type', e?.value);
              }}
              errorMessage={errors?.type ? errors.type?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('amount')}
              label={amount.label}
              onChange={(e: { target: { value: string } }) => {
                setValue('amount', e.target.value);
              }}
              value={watch('amount') ?? 0}
              errorMessage={errors?.amount ? errors?.amount?.message : ''}
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="list"
              {...register(itemGroups.name)}
              options={itemsGroupOptions}
              defaultValue={formattedOptions(watch(itemGroups.name))}
              // value={itemGroups.name}
              label={itemGroups.label}
              onChange={(e?: Array<object>) => {
                const Ids = e?.map(
                  (item: { item?: object; id?: number; name?: string }) => {
                    return item?.id;
                  },
                );
                const itemGroupData = e?.map(
                  (item: {
                    item?: object;
                    id?: string;
                    name?: string;
                    value?: number;
                    label?: string;
                  }) => {
                    return {
                      value: item?.id,
                      label: item?.name,
                    };
                  },
                );
                setValue('discountItemsGroupId', Ids);
                setValue(itemGroups.name, itemGroupData);
              }}
              errorMessage={
                errors?.itemGroups ? errors.itemGroups?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="list"
              {...register(products.name)}
              options={discountCodeOptions}
              defaultValue={formattedOptions(
                watch(products.name)?.length ? watch(products.name) : [],
              )}
              label={products.label}
              onChange={(e?: Array<object>) => {
                const Ids = e?.map(
                  (item: { item?: object; id?: string; name?: string }) =>
                    item?.id,
                );
                const productsData = e?.map(
                  (item: {
                    item?: object;
                    id?: string;
                    name?: string;
                    value?: number;
                    label?: string;
                  }) => {
                    return {
                      value: item?.id,
                      label: item?.name,
                      name: item?.name,
                    };
                  },
                );
                setValue('discountProductId', Ids);
                setValue(products.name, productsData);
              }}
              errorMessage={errors?.products ? errors.products?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="list"
              {...register(stores.name)}
              options={discountStoreOptions}
              defaultValue={formattedOptions(
                watch(stores.name)?.length ? watch(stores.name) : [],
              )}
              label={stores.label}
              onChange={(e?: Array<object>) => {
                const Ids = e?.map(
                  (item: {
                    item?: object;
                    id?: string;
                    name?: string;
                    value?: number;
                    label?: string;
                  }) => item?.id,
                );
                const storeData = e?.map(
                  (item: {
                    item?: object;
                    id?: string;
                    name?: string;
                    value?: number;
                    label?: string;
                  }) => {
                    return {
                      value: item?.id,
                      label: item?.name,
                    };
                  },
                );
                setValue('discountStoreId', Ids);
                setValue(stores.name, storeData);
              }}
              errorMessage={errors?.stores ? errors.stores?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('customerLimit')}
              label={customerLimit.label}
              onChange={(e: { target: { value: string } }) =>
                setValue('customerLimit', parseInt(e.target.value))
              }
              value={watch('customerLimit')}
              errorMessage={
                errors?.customerLimit ? errors?.customerLimit?.message : ''
              }
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
              value={watch('maximumAmount') ?? 0}
              errorMessage={
                errors?.maximumAmount ? errors?.maximumAmount?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('maximumLimit')}
              label={maximumLimit.label}
              onChange={(e: { target: { value: string } }) =>
                setValue('maximumLimit', parseInt(e.target.value))
              }
              value={watch('maximumLimit')}
              errorMessage={
                errors?.maximumLimit ? errors?.maximumLimit?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <CustomFieldComponent
              control={control}
              {...register(startDate.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(startDate.name, e.target.value)
              }
              name={startDate.name}
              label={startDate.label}
              inputValue={watch(startDate.name)}
              errorMessage={errors?.startDate ? errors.startDate?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            {/* <Field
              type="date"
              {...register('endDate')}
              label={endDate.label}
              onChange={(e: { target: { value: string } }) =>
                setValue('endDate', e.target.value)
              }
              defaultValues={watch('endDate')}
              value={watch('endDate')}
              errorMessage={errors?.endDate ? errors?.endDate?.message : ''}
            /> */}
            <CustomFieldComponent
              control={control}
              {...register(endDate.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(endDate.name, e.target.value)
              }
              name={endDate.name}
              label={endDate.label}
              inputValue={watch(endDate.name)}
              errorMessage={errors?.endDate ? errors.endDate?.message : ''}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
