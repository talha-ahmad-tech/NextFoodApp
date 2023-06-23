import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import {
  FieldValues,
  UseFormReturn,
  WatchObserver,
} from 'react-hook-form/dist/types';
import { KitchenApis } from 'services/modules/kitchen.api';

const General = ({
  formField,
  formData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formField: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = formData;
  const { name, description, productCategory } = formField;
  const { getOptions, loadedOptionsFor } = useGetOptions();
  const values = getValues();

  return (
    <div>
      <Card
        Headertitle={
          values?.id ? 'Update Kitchen Printer' : 'Add Kitchen Printer'
        }
      >
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
              {...register('description')}
              label={description.label}
              onChange={(e: { target: { value: string } }) => {
                setValue('description', e.target.value);
              }}
              value={watch('description')}
              errorMessage={
                errors?.description ? errors?.description?.message : ''
              }
            />
          </div>
          {/* <div className="col-sm-12 col-md-6">
            <Field
              type="options"
              {...register(itemGroup.name)}
              loadOptions={getOptions({
                endPoint: KitchenApis.itemGroupLookup,
                method: 'GET',
                key: 'itemGroup',
                fieldsToShow: ['name'],
                baseURLType: 'products',
                dataPickFromItems: false,
              })}
              inputValue={
                loadedOptionsFor['itemGroup']
                  ? watch(
                      itemGroup?.name as unknown as WatchObserver<FieldValues>,
                    )
                  : watch('itemGroup')
                  ? String(watch('itemGroup'))
                  : 'Select ...'
              }
              label={itemGroup.label}
              onChange={(e: { e: object; id: number; name: string }) => {
                setValue('itemGroup', e?.id);
                setValue('itemGroupName', e?.id);
              }}
              errorMessage={errors?.itemGroup ? errors.itemGroup?.message : ''}
            />
          </div> */}
          <div className="col-sm-12 col-md-6">
            <Field
              type="options"
              {...register(productCategory.name)}
              loadOptions={getOptions({
                endPoint: KitchenApis.categoryLookup,
                method: 'GET',
                key: 'productCategory',
                fieldsToShow: ['name'],
                baseURLType: 'products',
                dataPickFromItems: false,
              })}
              inputValue={
                loadedOptionsFor['productCategory']
                  ? watch(
                      productCategory?.name as unknown as WatchObserver<FieldValues>,
                    )
                  : watch('productCategory')
                  ? String(watch('productCategory'))
                  : 'Select ...'
              }
              label={productCategory.label}
              onChange={(e: { e: object; id: number; name: string }) => {
                setValue('productCategory', e?.id);
                setValue('productCategoryName', e?.id);
              }}
              errorMessage={
                errors?.productCategory ? errors.productCategory?.message : ''
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
