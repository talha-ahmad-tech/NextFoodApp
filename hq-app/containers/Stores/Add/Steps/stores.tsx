import {
  useGetOptions,
  useSelectionGetter,
} from '@/utils/customHooks/useGetOtions';
import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import FileUploader from 'components/FileUploader';
import { ChangeEvent } from 'react';
import type {
  FieldValues,
  UseFormReturn,
  WatchObserver,
} from 'react-hook-form/dist/types';
import { StoresApis } from 'services/modules/stores.api';

const storeTypeList = [
  { value: 1, name: 'Fast Food' },
  { value: 2, name: 'Fine Dining' },
  { value: 3, name: 'Delivery' },
];

const todayFilterTypeList = [
  { value: 1, name: 'By Day' },
  { value: 2, name: 'By Shift' },
];

const floorList = [
  { value: 1, name: 'Main Hall' },
  { value: 2, name: '1st Floor' },
  { value: 3, name: '2nd Floor' },
];

const Stores = ({
  formField,
  formData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formField: { [key: string]: any };
  formData: UseFormReturn;
}) => {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
    getValues,
  } = formData;
  // const { data } = useFetchStoresNumberSeriesQuery({});
  // const storeIdCode = data?.result.code;
  // setValue('storeId', storeIdCode);
  const {
    storeId,
    storeName,
    storeType,
    paymentMethod,
    todayFilterType,
    active,
    priceExclusiveTax,
    parkEnabled,
    discountExclusiveTax,
    storeLogo,
    showMenuImages,
    numberSequence,
    floor,
    tax,
    currencyId,
    deliveryCharges,
  } = formField;

  const { getOptions, loadedOptionsFor } = useGetOptions();

  const paymentOptions = useSelectionGetter({
    isFormattedData: true,
    endPoint: StoresApis.paymentMethodLookup,
    method: 'get',
    key: 'paymentMethod',
    fieldsToShow: ['name'],
    // simpleOptions: true,
    dataPickFromItems: true,
    baseURLType: 'core',
  });

  const taxesOptions = useSelectionGetter({
    isFormattedData: true,
    endPoint: StoresApis.taxLookup,
    method: 'get',
    key: 'tax',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    baseURLType: 'core',
  });

  const formattedOptions = (data: { [key: string]: string }[]) =>
    data?.map(
      (items: {
        id?: string | number;
        description?: string;
        tax?: { name?: string };
        paymentMethod?: { name?: string };
        name?: string;
      }) => {
        return {
          ...items,
          label: (
            <div
              style={{
                height: '60x',
              }}
            >
              <span
                style={{
                  marginRight: '50px',
                }}
              >
                {items?.id}
              </span>
              <span
                style={{
                  marginRight: '50px',
                }}
              >
                {items?.tax?.name ? items?.tax?.name : ''}
              </span>

              <span
                style={{
                  marginRight: '50px',
                }}
              >
                {items?.paymentMethod?.name ? items?.paymentMethod?.name : ''}
              </span>

              <span>{items?.description ? items.description : ''}</span>
            </div>
          ),

          value: items?.id,
        };
      },
    );
  const values = getValues();
  console.log('[][]', values);
  return (
    <div>
      <Card Headertitle="Stores">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('storeId')}
              onChange={(e: { target: { value: string } }) =>
                setValue('storeId', e.target.value)
              }
              label={storeId.label}
              value={watch('storeId')}
              disabled
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('storeName')}
              onChange={(e: { target: { value: string } }) =>
                setValue('storeName', e.target.value)
              }
              label={storeName.label}
              value={watch('storeName')}
              errorMessage={errors?.storeName ? errors?.storeName?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register('storeType')}
              onChange={(e: { name?: string; value?: number }) => {
                setValue('storeType', e?.value);
                clearErrors(['storeType']);
              }}
              clear
              closeMenuOnSelect
              options={storeTypeList}
              label={storeType.label}
              value={watch('storeType')}
              errorMessage={errors?.storeType ? errors?.storeType?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="menulist"
              isFormattedData={true}
              {...register(paymentMethod.name)}
              options={paymentOptions}
              defaultValue={formattedOptions(
                watch('paymentMethod')?.length ? watch('paymentMethod') : [],
              )}
              label={paymentMethod?.label}
              name={paymentMethod?.name}
              onChange={(e: []) => {
                console.log('e', e);

                const payload = e.map(
                  (items: { id: string | number; name: string }) => {
                    return {
                      paymentMethodId: items?.id,
                      paymentMethodName: items?.name,
                      // storeId: values?.storeId,
                    };
                  },
                );
                setValue('paymentMethod', payload);
              }}
              errorMessage={
                errors?.paymentMethod ? errors.paymentMethod?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register('todayFilterType')}
              onChange={(e: { name?: string; value?: number }) => {
                setValue('todayFilterType', e?.value);
              }}
              options={todayFilterTypeList}
              label={todayFilterType.label}
              value={watch('todayFilterType')}
              clear
              closeMenuOnSelect
              errorMessage={
                errors?.todayFilterType ? errors?.todayFilterType?.message : ''
              }
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="menulist"
              isFormattedData={true}
              {...register(tax.name)}
              options={taxesOptions}
              defaultValue={formattedOptions(
                watch('tax')?.length ? watch('tax') : [],
              )}
              label={tax?.label}
              name={tax?.name}
              onChange={(e: { value: string | number }[]) => {
                const payload = e.map((items: { value: string | number }) => {
                  return {
                    // storeId: values?.storeId,
                    taxId: items?.value,
                  };
                });
                setValue('tax', payload);
                // setValue('taxDetail', payload);
              }}
              errorMessage={errors?.tax ? errors.tax?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('numberSequence')}
              onChange={(e: { target: { value: string } }) =>
                setValue('numberSequence', e.target.value)
              }
              label={numberSequence.label}
              value={watch('numberSequence')}
              errorMessage={
                errors?.numberSequence ? errors?.numberSequence?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="options"
              {...register(currencyId.name)}
              loadOptions={getOptions({
                endPoint: StoresApis.currencyLookup,
                method: 'GET',
                key: 'currencyId',
                fieldsToShow: ['name'],
                baseURLType: 'core',
                dataPickFromItems: true,
              })}
              inputValue={
                loadedOptionsFor['currencyId']
                  ? watch(
                      currencyId?.name as unknown as WatchObserver<FieldValues>,
                    )
                  : watch('currencyId')
                  ? String(watch('currencyId'))
                  : 'Select ...'
              }
              label={currencyId.label}
              onChange={(e: { e: object; id: number; name: string }) => {
                setValue('currencyId', e?.id);
                setValue('currencyName', e?.id);
              }}
              errorMessage={
                errors?.currencyId ? errors.currencyId?.message : ''
              }
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register('floor')}
              onChange={(e: { name?: string; value?: number }) => {
                setValue('floor', e?.value);
              }}
              clear
              closeMenuOnSelect
              options={floorList}
              label={floor.label}
              value={watch('floor')}
              errorMessage={errors?.floor ? errors?.floor?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="number"
              {...register('deliveryCharges')}
              onChange={(e: { target: { value: string } }) =>
                setValue('deliveryCharges', e.target.value)
              }
              label={deliveryCharges.label}
              value={watch('deliveryCharges')}
              errorMessage={
                errors?.deliveryCharges ? errors?.deliveryCharges?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register('active')}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue('active', e.target.checked);
              }}
              label={active.label}
              value={watch('active')}
              checked={watch(active.name)}
              errorMessage={errors?.active ? errors?.active?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register('priceExclusiveTax')}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue('priceExclusiveTax', e.target.checked);
              }}
              label={priceExclusiveTax.label}
              value={watch('priceExclusiveTax')}
              checked={watch(priceExclusiveTax.name)}
              errorMessage={
                errors?.priceExclusiveTax
                  ? errors?.priceExclusiveTax?.message
                  : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register('parkEnabled')}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue('parkEnabled', e.target.checked);
              }}
              label={parkEnabled.label}
              value={watch('parkEnabled')}
              checked={watch(parkEnabled.name)}
              errorMessage={
                errors?.parkEnabled ? errors?.parkEnabled?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register('discountExclusiveTax')}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue('discountExclusiveTax', e.target.checked);
              }}
              label={discountExclusiveTax.label}
              value={watch('discountExclusiveTax')}
              checked={watch(discountExclusiveTax.name)}
              errorMessage={
                errors?.discountExclusiveTax
                  ? errors?.discountExclusiveTax?.message
                  : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register('showMenuImages')}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue('showMenuImages', e.target.checked);
              }}
              label={showMenuImages.label}
              value={watch('showMenuImages')}
              checked={watch(showMenuImages.name)}
              errorMessage={
                errors?.showMenuImages ? errors?.showMenuImages?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <FileUploader
              type="file"
              {...register(storeLogo.name)}
              appType="core"
              endPoint="file-handler/upload-resource"
              name={storeLogo.name}
              label={storeLogo.label}
              resourceType="1"
              changeUrl={async (value: string) => {
                setValue('storeLogo', await value);
              }}
              errorMessage={errors?.storeLogo ? errors.storeLogo?.message : ''}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Stores;
