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

const LocationComponent = ({ formField, formData }: any) => {
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
  const { category, region, cluster, itemGroups, stores } = formField;
  const regionOptions = useSelectionGetter({
    endPoint: discountApi.region,
    method: 'get',
    key: 'region',
    fieldsToShow: ['name'],
    baseURLType: 'core',
    dataPickFromItems: false,
    simpleOptions: true,
  });
  const storesOptions = useSelectionGetter({
    endPoint: discountApi.stores,
    method: 'get',
    key: 'stores',
    fieldsToShow: ['name'],
    baseURLType: 'core',
    // dataPickFromItems: false,

    simpleOptions: true,
  });
  const clusterOptions = useSelectionGetter({
    endPoint: discountApi.cluster,
    method: 'get',
    key: 'cluster',
    fieldsToShow: ['name'],
    baseURLType: 'core',
    dataPickFromItems: false,

    simpleOptions: true,
  });
  console.log('LOGGS', regionOptions, storesOptions, clusterOptions);

  return (
    <>
      <ListHeaderWrapper title="Location" />
      <div className="col-sm-12 col-md-6">
        <Field
          type="multiselect"
          componentType="list"
          {...register(region.name)}
          options={regionOptions}
          defaultValue={formattedOptions(
            watch(region.name)?.length ? watch(region.name) : [],
          )}
          label={region.label}
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
            setValue(region.name, itemGroupData);
          }}
          errorMessage={errors?.region ? errors.region?.message : ''}
        />
      </div>
      <div className="col-sm-12 col-md-6">
        <Field
          type="multiselect"
          componentType="list"
          {...register(cluster.name)}
          options={clusterOptions}
          defaultValue={formattedOptions(
            watch(cluster.name)?.length ? watch(cluster.name) : [],
          )}
          label={cluster.label}
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
            setValue(cluster.name, productsData);
          }}
          errorMessage={errors?.cluster ? errors.cluster?.message : ''}
        />
      </div>
      <div className="col-sm-12 col-md-6">
        <Field
          type="multiselect"
          componentType="list"
          {...register(stores.name)}
          options={storesOptions}
          defaultValue={formattedOptions(
            watch(stores.name)?.length ? watch(stores.name) : [],
          )}
          label={stores.label}
          onChange={(e?: Array<object>) => {
            const storeData = e?.map((item: { id?: string; name?: string }) => {
              return {
                storeId: item?.id,
                storeName: item?.name,
              };
            });
            // setValue('discountStoreId', Ids);
            setValue(stores.name, storeData);
          }}
          errorMessage={errors?.stores ? errors.stores?.message : ''}
        />
      </div>
    </>
  );
};
export default LocationComponent;
