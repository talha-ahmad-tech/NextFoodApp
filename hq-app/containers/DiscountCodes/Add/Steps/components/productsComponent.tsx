import {
  useGetOptions,
  useSelectionGetter,
} from '@/utils/customHooks/useGetOtions';
import { ListHeaderWrapper } from '@fridayfood/shared/components';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
// import { Field, FormikProvider } from 'formik';
import { UseFormReturn } from 'react-hook-form';
import { discountApi } from 'services/modules/discount.api';

interface productForm {
  formField: { [key: string]: any };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}

const ProductComponent = ({ formField, formData }: any) => {
  const { formattedOptions } = useGetOptions();
  console.log('field', formData, formField);

  const {
    register,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  }: UseFormReturn<any> = formData;
  const { category, products, itemGroups } = formField;
  const itemGroupOptions = useSelectionGetter({
    endPoint: discountApi.itemGroups,
    method: 'GET',
    key: 'itemGroups',
    fieldsToShow: ['name'],
    baseURLType: 'products',
    dataPickFromItems: true,
    simpleOptions: true,
  });

  const productsOptions = useSelectionGetter({
    endPoint: discountApi.products,
    method: 'get',
    key: 'products',
    fieldsToShow: ['name'],
    baseURLType: 'products',
    simpleOptions: true,
  });
  const categoryOptions = useSelectionGetter({
    endPoint: discountApi.category,
    method: 'get',
    key: 'category',
    fieldsToShow: ['name'],
    baseURLType: 'products',
    simpleOptions: true,
  });
  return (
    <>
      <ListHeaderWrapper title="Products" />
      <div className="col-sm-12 col-md-6">
        <Field
          type="multiselect"
          componentType="list"
          {...register(itemGroups.name)}
          options={itemGroupOptions}
          defaultValue={formattedOptions(watch(itemGroups.name))}
          label={itemGroups.label}
          onChange={(e?: Array<object>) => {
            const itemGroupData = e?.map(
              (item: { id?: string; name?: string }) => {
                return {
                  itemGroupId: item?.id,
                  itemGroupName: item?.name,
                };
              },
            );
            // setValue('discountItemsGroupId', Ids);
            setValue(itemGroups.name, itemGroupData);
          }}
          errorMessage={errors?.itemGroups ? errors.itemGroups?.message : ''}
        />
      </div>
      <div className="col-sm-12 col-md-6">
        <Field
          type="multiselect"
          componentType="list"
          {...register(category.name)}
          options={categoryOptions}
          defaultValue={formattedOptions(
            watch(category.name)?.length ? watch(category.name) : [],
          )}
          label={category.label}
          onChange={(e?: Array<object>) => {
            const productsData = e?.map(
              (item: { id?: string; name?: string }) => {
                return {
                  categoryId: item?.id,
                  label: item?.name,
                  categoryName: item?.name,
                };
              },
            );
            // setValue('discountProductId', Ids);
            setValue(category.name, productsData);
          }}
          errorMessage={errors?.category ? errors.category?.message : ''}
        />
      </div>
      <div className="col-sm-12 col-md-6">
        <Field
          type="multiselect"
          componentType="list"
          {...register(products.name)}
          options={productsOptions}
          defaultValue={formattedOptions(
            watch(products.name)?.length ? watch(products.name) : [],
          )}
          label={products.label}
          onChange={(e?: Array<object>) => {
            const productsData = e?.map(
              (item: { id?: string; name?: string }) => {
                return {
                  productId: item?.id,
                  label: item?.name,
                  productName: item?.name,
                };
              },
            );
            // setValue('discountProductId', Ids);
            setValue(products.name, productsData);
          }}
          errorMessage={errors?.products ? errors.products?.message : ''}
        />
      </div>
    </>
  );
};
export default ProductComponent;
