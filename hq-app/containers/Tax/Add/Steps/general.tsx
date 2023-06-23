import {
  useGetOptions,
  useSelectionGetter,
} from '@/utils/customHooks/useGetOtions';
import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { taxApis } from 'services/modules/tax.api';
import type {
  FieldValues,
  UseFormReturn,
  WatchObserver,
} from 'react-hook-form/dist/types';
import { TAX_FORM_TAB, TAX_TYPE } from '../../types';

const General = ({
  formField,
  formData,
}: {
  formField: TAX_FORM_TAB;
  formData: UseFormReturn;
}) => {
  const { getOptions, loadedOptionsFor } = useGetOptions();

  const {
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = formData;

  const productsOptions = useSelectionGetter({
    endPoint: taxApis.Stores,
    method: 'get',
    key: 'product',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    isFormattedData: true,
    baseURLType: 'core',
  });

  const taxesOptions = useSelectionGetter({
    endPoint: taxApis.Products,
    method: 'get',
    key: 'product',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    isFormattedData: true,
    baseURLType: 'products',
  });

  const {
    taxId = {},
    name = {},
    description = {},
    taxRate = {},
    taxType,
    taxStores = {},
    clusters = {},
    taxProducts = {},
  } = formField;

  const {
    name: pname = '',
    label: plabel,
    options,
  } = taxType || ({} as TAX_TYPE);
  const ClusterID = watch('clusterId');

  const formattedOptions = (data: { [key: string]: string }[]) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.map((items: { [key: string]: any }) => {
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
              {items?.store?.name ? items.prodcutName : ''}
            </span>
            <span>{items?.description ? items.description : ''}</span>
          </div>
        ),

        value: items?.id,
      };
    });

  return (
    <div>
      <Card Headertitle="Taxation">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              {...register(taxId.name as string)}
              label={taxId.label}
              // value="TR-123"
              disabled
              value={watch(taxId.name as unknown as WatchObserver<FieldValues>)}
              errorMessage={errors?.taxId ? errors?.taxId?.message : ''}
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
              type="number"
              placeholder="Enter"
              {...register(taxRate.name as string)}
              onChange={(e: { target: { value: string } }) => {
                setValue('taxRate', e.target.value);
                clearErrors(['taxRate']);
              }}
              label={taxRate.label + '( % )'}
              value={watch(
                taxRate.name as unknown as WatchObserver<FieldValues>,
              )}
              errorMessage={errors?.taxRate ? errors.taxRate?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register(pname)}
              options={options}
              label={plabel}
              value={watch(
                taxType?.name as unknown as WatchObserver<FieldValues>,
              )}
              onChange={(e: { [key: string]: string }) => {
                setValue('taxType', e?.value);
                clearErrors(['taxType']);
              }}
              clear
              closeMenuOnSelect
              errorMessage={errors?.taxType ? errors.taxType?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="options"
              isFormattedData={true}
              {...register(clusters?.name as string)}
              loadOptions={getOptions({
                endPoint: taxApis.Clusters,
                method: 'get',
                key: 'clusters',
                fieldsToShow: ['name'],
                customDataPicker: '',
                // simpleOptions: true,
                baseURLType: 'core',
              })}
              inputValue={
                loadedOptionsFor['clusters']
                  ? watch(
                      clusters?.name as unknown as WatchObserver<FieldValues>,
                    )
                  : watch('clusterId')
                  ? String(watch('clusterName'))
                  : 'Select ...'
              }
              label={clusters.label}
              onChange={(value: { id?: number; name: string }) => {
                setValue('clusterId', value?.id);
                setValue('clusters', value?.id);
                setValue('clusterName', value?.name);
                clearErrors(['clusters']);
              }}
              errorMessage={errors?.clusters ? errors.clusters?.message : ''}
            />
          </div>
          {ClusterID && (
            <div className="col-sm-12 col-md-6">
              <Field
                type="multiselect"
                componentType="menulist"
                isFormattedData={true}
                {...register(taxStores?.name as string)}
                options={productsOptions}
                defaultValue={formattedOptions(watch('taxStores'))}
                label={taxStores?.label}
                name={taxStores?.name}
                onChange={(props: { id: string | number }[]) => {
                  const payload = props.map(
                    (item: { [key: string]: number | string }) => ({
                      externalId: '',
                      tenantId: null,
                      taxId: 0,
                      storeId: item.id,
                    }),
                  );
                  setValue('taxStores', payload);
                  clearErrors(['taxStores']);
                }}
              />
            </div>
          )}

          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="menulist"
              isFormattedData={true}
              {...register(taxProducts?.name as string)}
              options={taxesOptions}
              defaultValue={formattedOptions(watch('taxProducts'))}
              label={taxProducts?.label}
              name={taxProducts?.name}
              onChange={(props: { id: string | number }[]) => {
                const payload = props.map(
                  (item: { [key: string]: number | string }) => ({
                    externalId: '',
                    tenantId: null,
                    taxId: 0,
                    productId: item.id,
                    productName: item.name,
                  }),
                );
                setValue('taxProducts', payload);
                clearErrors(['taxProducts']);
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
