import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { RegionApis } from 'services/modules/regions.api';

const General = ({
  formField,
  formData,
}: {
  formField: { [key: string]: any };

  formData: UseFormReturn<any>;
}) => {
  const { getOptions, loadedOptionsFor } = useGetOptions();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = formData;

  const { name, description, stores } = formField;

  return (
    <div>
      <Card Headertitle="Add Regions">
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
              type="options"
              isMulti={true}
              {...register(stores.name)}
              loadOptions={getOptions({
                endPoint: RegionApis.RegionStores,
                method: 'GET',
                key: 'stores',
                fieldsToShow: ['name'],
                baseURLType: 'core',
              })}
              inputValue={
                loadedOptionsFor['stores'] ? watch(stores.name) : 'Select'
              }
              label={stores.label}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any[]) => {
                const event = e?.map(item => ({
                  storeId: item.id,
                }));
                setValue('stores', event);
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
