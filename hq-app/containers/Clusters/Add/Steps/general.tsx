import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import {
  useGetOptions,
  useSelectionGetter,
} from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { ClusterApis } from 'services/modules/clusters.api';

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
    formState: { errors },
    clearErrors,
    getValues,
  } = formData;
  const { name, description, stores } = formField;
  const values = getValues();
  const storesOptions = useSelectionGetter({
    isFormattedData: true,
    endPoint: ClusterApis.ClusterStores,
    method: 'get',
    key: 'stores',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    baseURLType: 'core',
  });

  return (
    <div>
      <Card Headertitle={values?.id ? 'Update Clusters' : 'Add Clusters'}>
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
          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="list"
              isFormattedData={true}
              {...register(stores.name)}
              options={storesOptions}
              defaultValue={formattedOptions(
                watch(stores.name)?.length ? watch(stores.name) : [],
              )}
              label={stores?.label}
              name={stores?.name}
              onChange={(props: { id: string | number; name: string }[]) => {
                const payload = props.map(
                  (item: { id: number | string; name: string }) => ({
                    storeId: item.id,
                    name: item.name,
                  }),
                );
                setValue('stores', payload);
                clearErrors(['stores']);
              }}
              errorMessage={errors?.stores ? errors.stores?.message : ''}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
