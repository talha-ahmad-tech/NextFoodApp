/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetOptions,
  useSelectionGetter,
} from '@/utils/customHooks/useGetOtions';
import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { SuppliersApis } from 'services/modules/suppliers.api';

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
  } = formData;

  const taxesOptions = useSelectionGetter({
    isFormattedData: true,
    endPoint: SuppliersApis.SuppliersTaxGroup,
    method: 'get',
    key: 'tax',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    baseURLType: 'core',
  });

  const storesOptions = useSelectionGetter({
    isFormattedData: true,
    endPoint: SuppliersApis.SupplierStore,
    method: 'get',
    key: 'stores',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    baseURLType: 'core',
  });

  const { code, name, description, contactNumber, email, taxId, store } =
    formField;
  const { formattedOptions } = useGetOptions();
  return (
    <div>
      <Card Headertitle="General">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('code')}
              onChange={(e: { target: { value: string } }) =>
                setValue('code', e.target.value)
              }
              label={code.label}
              value={watch('code')}
              disabled
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('name')}
              onChange={(e: { target: { value: string } }) =>
                setValue('name', e.target.value)
              }
              label={name.label}
              value={watch('name')}
              errorMessage={errors?.name ? errors?.name?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('description')}
              onChange={(e: { target: { value: string } }) =>
                setValue('description', e.target.value)
              }
              label={description.label}
              value={watch('description')}
              errorMessage={
                errors?.description ? errors?.description?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('contactNumber')}
              onChange={(e: { target: { value: string } }) =>
                setValue('contactNumber', e.target.value)
              }
              label={contactNumber.label}
              value={watch('contactNumber')}
              errorMessage={
                errors?.contactNumber ? errors?.contactNumber?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('email')}
              onChange={(e: { target: { value: string } }) =>
                setValue('email', e.target.value)
              }
              label={email.label}
              value={watch('email')}
              errorMessage={errors?.email ? errors?.email?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="menulist"
              isFormattedData={true}
              {...register(taxId.name)}
              options={taxesOptions}
              defaultValue={formattedOptions(
                watch(taxId.name)?.length ? watch(taxId.name) : [],
              )}
              label={taxId?.label}
              name={taxId?.name}
              onChange={(e: any) => {
                const payload = e.map((items: any) => {
                  return {
                    taxId: items?.value,
                    name: items?.name,
                  };
                });
                setValue(taxId.name, payload);
                setValue('taxIdName', payload);
              }}
              errorMessage={errors?.taxId ? errors.taxId?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="list"
              isFormattedData={true}
              {...register(store.name)}
              options={storesOptions}
              defaultValue={formattedOptions(
                watch(store.name)?.length ? watch(store.name) : [],
              )}
              label={store?.label}
              name={store?.name}
              onChange={(props: { id: string | number; name: string }[]) => {
                const payload = props.map(
                  (item: { id: number | string; name: string }) => ({
                    storeId: item.id,
                    name: item.name,
                  }),
                );
                setValue('store', payload);
                setValue('storeIdName', payload);
              }}
              errorMessage={errors?.store ? errors.store?.message : ''}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
