import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import type {
  FieldValues,
  UseFormReturn,
  WatchObserver,
} from 'react-hook-form/dist/types';
import {
  useGetOptions,
  useSelectionGetter,
} from '@/utils/customHooks/useGetOtions';
import { productsEndpoints } from 'services/modules/products.api';
import FileUploader from 'components/FileUploader';
// import { PACKAGINGMATERIAL_FORM_TAB } from '../../types';
const General = ({
  formField,
  formData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formField: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn;
}) => {
  const { getOptions, formattedOptions } = useGetOptions();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    clearErrors,
  } = formData;

  const taxesOptions = useSelectionGetter({
    isFormattedData: true,
    endPoint: productsEndpoints.taxDropdown,
    method: 'get',
    key: 'ingredientTaxes',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    baseURLType: 'core',
  });

  const {
    productId = {},
    productName = {},
    description = {},
    purchaseUom = {},
    cost = {},
    active = {},
    imageUrl = {},
    ingredientTaxes,
  } = formField;
  return (
    <div>
      <Card Headertitle="General">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(productId.name)}
              label={productId.label}
              value={watch(
                productId.name as unknown as WatchObserver<FieldValues>,
              )}
              onChange={(e: { target: { value: string } }) => {
                setValue('productId', e.target.value);
                clearErrors(['productId']);
              }}
              errorMessage={errors.productId ? errors.productId?.message : ''}
              disabled
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('productName')}
              onChange={(e: { target: { value: string } }) => {
                setValue('productName', e.target.value);
                clearErrors(['productName']);
              }}
              label={productName.label}
              value={watch('productName')}
              errorMessage={
                errors?.productName ? errors?.productName?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="textarea"
              {...register('description')}
              onChange={(e: { target: { value: string } }) => {
                setValue('description', e.target.value);
                clearErrors(['description']);
              }}
              label={description.label}
              value={watch('description')}
              errorMessage={
                errors?.description ? errors?.description?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              {...register(purchaseUom.name as string)}
              type="options"
              loadOptions={getOptions({
                endPoint: productsEndpoints?.uomDropdown,
                method: 'get',
                key: 'purchaseUom',
                fieldsToShow: ['name'],
                dataPickFromItems: true,
                baseURLType: 'products',
              })}
              inputValue={watch(
                purchaseUom.name as unknown as WatchObserver<FieldValues>,
              )}
              label={purchaseUom.label}
              name={purchaseUom.name}
              onChange={(e: { name?: string; id?: number }) => {
                setValue('purchaseUom', e?.id);
                setValue('purchaseUomDetail', e?.id);
                setValue('purchaseUomName', e?.name);
                clearErrors(['purchaseUom']);
              }}
              errorMessage={
                errors?.purchaseUom ? errors.purchaseUom?.message : ''
              }
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(cost.name)}
              onChange={(e: { target: { value: string } }) => {
                setValue(cost.name, e.target.value);
                clearErrors([cost.name]);
              }}
              label={cost.label}
              value={watch(cost.name)}
              errorMessage={errors?.cost ? errors.cost?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="menulist"
              isFormattedData={true}
              {...register(ingredientTaxes?.name)}
              options={taxesOptions}
              defaultValue={formattedOptions(
                watch(ingredientTaxes?.name)?.length
                  ? watch(ingredientTaxes?.name)
                  : [],
              )}
              label={ingredientTaxes?.label}
              name={ingredientTaxes?.name}
              onChange={(e: []) => {
                const payload = e.map(
                  (items: {
                    value?: number;
                    name?: string;
                    description?: string;
                  }) => {
                    return {
                      id: 0,
                      ids: items?.value,
                      description: items?.description,
                      tenantId: null,
                      taxName: items?.name,
                      dealId: 0,
                      taxId: items?.value,
                    };
                  },
                );

                setValue(ingredientTaxes?.name, payload);
                setValue(ingredientTaxes?.name, payload);
                clearErrors([ingredientTaxes?.name]);
              }}
              errorMessage={errors?.tax ? errors.tax?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register(active.name)}
              label={active.label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue('active', e?.target?.checked);
                clearErrors(['active']);
              }}
              checked={watch(active.name)}
              errorMessage={errors?.active ? errors?.active.message : ''}
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <FileUploader
              type="file"
              {...register(imageUrl.name)}
              appType="products"
              endPoint="file-handler/upload-resource"
              name={imageUrl.name}
              label={imageUrl.label}
              resourceType="1"
              changeUrl={async (value: string) => {
                setValue('imageUrl', await value);
              }}
              errorMessage={errors?.imageUrl ? errors.imageUrl?.message : ''}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
