/* eslint-disable @typescript-eslint/no-explicit-any */
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
// import {useGetOptions} from '@/utils/customHooks/';

import { productsEndpoints } from 'services/modules/products.api';
import { useFetchModifiersQuery } from 'services/modules/finishedproduct.api';

import { useEffect, useState } from 'react';
import { useProductDealLinesHook } from '@/containers/Productsdeal/productDealLinesHook';
import Tree from '@fridayfood/shared/components/Tree';
import { useRouter } from 'next/router';
import FileUploader from 'components/FileUploader';

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
    getValues,
    clearErrors,
    formState: { errors },
  } = formData;

  const values = getValues();

  const router = useRouter();
  const { id: productsId = 0 } = router.query || 0;

  const { getOptions, formattedOptions } = useGetOptions();

  const taxes = useSelectionGetter({
    isFormattedData: true, // for custom options, e.g Id,Name,Description as label
    // simpleOptions: true,
    endPoint: productsEndpoints.taxDropdown,
    method: 'get',
    key: 'tax',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    baseURLType: 'core',
  });

  const {
    productId,
    productName,
    description,
    categoryId,
    itemGroupId,
    saleUom,
    saleUomDetail,
    // purchaseUom,
    // purchaseUomDetail,
    // cost,

    inStorePrice,
    deliveryPrice,
    collectionPrice,
    position,
    preparationTime,
    active,
    featuredProduct,
    enableDiscount,
    imageUrl,
    tax,
    items,
    categoryName,
  } = formField;
  const [tree, setTree] = useState([]);

  const { lines, setLines } = useProductDealLinesHook();

  const { data, isSuccess } = useFetchModifiersQuery(1);

  const modifiersDetails =
    productsId && values?.modifiersDetail?.length
      ? values?.modifiersDetail
      : [];

  // let preChecked={}
  let productsModifierValues = [] as any;
  modifiersDetails?.forEach((productsMod: any) => {
    // preChecked={}
    productsModifierValues = [
      ...productsModifierValues,
      ...productsMod?.productModifierValues,
    ];
  });
  useEffect(() => {
    if (data || isSuccess) {
      let checkedModifier = {};
      const modifiedData = data?.items?.map(
        (items: {
          expanded?: boolean;
          checked?: boolean;
          id?: number;
          modifierValues?: [];
        }) => {
          if (
            modifiersDetails?.find((foundItem: any) => {
              if (items?.id === foundItem?.modifierId) {
                // preChecked={}
                return items?.id;
              } else {
                items = { ...items };
                return undefined;
              }
            })
          ) {
            const resultants = items?.modifierValues?.map((value: any) => {
              productsModifierValues?.find((founded: any) => {
                if (value?.id === founded?.modifierValueId) {
                  checkedModifier = {
                    ...value,
                    name: value?.name,
                    checked: true,
                  };
                  return checkedModifier;
                } else {
                  checkedModifier = {
                    ...value,
                    checked: false,
                  };
                }
              });
              return checkedModifier;
            });
            return {
              ...items,
              expanded: true,
              checked: true,
              modifierValues: resultants,
              parent: true,
            };
          } else {
            return {
              ...items,
              expanded: false,
              checked: false,
              parent: true,
            };
          }
        },
      );
      setTree(modifiedData);
    }
  }, [data]);

  let payload = {} as any;
  let resultants = {} as any;

  const onCheckChanges = (event: any) => {
    const values = event?.modifiers?.map((outerItems: any) => {
      let modify = {
        id: 0,
        modifierId: 0,
        name: '',
        productModifierValues: [],
        productId: 0,
      } as any;
      let nestedVlaues = [] as any;
      outerItems?.forEach(
        (innerItems: {
          modifierId: number;
          productModifierId: number;
          modifierValueId: number;
          id: number;
          name?: string;
        }) => {
          nestedVlaues = [
            ...nestedVlaues,
            {
              id: 0,
              productModifierId: 0,
              modifierValueId: Number(innerItems?.id),
              name: innerItems?.name,
            },
          ];
          modify = {
            ...modify,
            id: 0,
            name: innerItems?.name,
            modifierId: innerItems?.modifierId,
            productId: productsId ? Number(productsId) : 0,
            tenantId: null,
            productModifierValues: [...nestedVlaues],
          };
          payload = { ...payload, ...modify };
        },
      );
      resultants = { ...resultants, ...payload };
      return resultants;
    });

    setValue('modifiers', event?.selectedItem);
    setValue('modifiersTitle', event?.selectedItem);
    setLines({ ...lines, productModifiers: values });
  };

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
                clearErrors([productId.name]);
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
                clearErrors([productName.name]);
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
                clearErrors([description.name]);
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
              {...register(itemGroupId.name)}
              type="options"
              loadOptions={getOptions({
                endPoint: productsEndpoints?.itemGroupDropdown,
                method: 'get',
                key: 'itemGroupId',
                fieldsToShow: ['name'],
                dataPickFromItems: true,
                baseURLType: 'products',
              })}
              cacheUniqs={[]}
              isSearchable
              inputValue={watch([items.name]) || watch([itemGroupId.name])}
              defaultInputValue={
                watch([items.name]) || watch([itemGroupId.name])
              }
              label={itemGroupId.label}
              onChange={(e: { name?: string; id?: number }) => {
                setValue('itemGroupId', e?.id);
                setValue('itemGroupDetail', e?.id);
                setValue('items', e?.name);
                clearErrors([itemGroupId.name]);
              }}
              errorMessage={
                errors?.itemGroupId ? errors.itemGroupId?.message : ''
              }
            />
          </div>

          {values?.itemGroupId ? (
            <div className="col-sm-12 col-md-6">
              <Field
                {...register(categoryId.name)}
                type="options"
                loadOptions={getOptions({
                  endPoint: productsEndpoints?.categoryByItem(
                    watch('itemGroupDetail'),
                  ),
                  method: 'get',
                  key: 'categoryId',
                  fieldsToShow: ['name'],
                  dataPickFromItems: true,
                  baseURLType: 'products',
                })}
                inputValue={watch([categoryName.name, categoryId.name])}
                defaultInputValue={watch([categoryName.name])}
                label={categoryId.label}
                onChange={(e: { name?: string; id?: number }) => {
                  setValue('categoryId', e?.id);
                  setValue('categoryDetail', e?.id);
                  setValue('categoryName', e?.name);
                  clearErrors([categoryId.name]);
                }}
                cacheUniqs={[watch(itemGroupId.name), watch(categoryId.name)]}
                errorMessage={
                  errors?.categoryId ? errors.categoryId?.message : ''
                }
                clear
              />
            </div>
          ) : null}

          <div className="col-sm-12 col-md-6">
            <Field
              isDefaultAsync
              type="options"
              {...register(saleUom.name as string)}
              loadOptions={getOptions({
                endPoint: productsEndpoints?.uomDropdown,
                method: 'get',
                key: 'saleUom',
                fieldsToShow: ['name'],
                dataPickFromItems: true,
                baseURLType: 'products',
              })}
              inputValue={watch(['saleUom', 'saleUomName'])}
              defaultInputValue={watch(['saleUomName'])}
              label={saleUom.label}
              onChange={(e: { name?: string; id?: number }) => {
                setValue('saleUomName', e?.name);
                setValue(saleUomDetail.name, e?.id);
                setValue('saleUom', e?.id);
                clearErrors([saleUom.name]);
              }}
              cacheUniqs={[]}
              additional={{
                page: 1,
              }}
              errorMessage={errors?.saleUom ? errors.saleUom?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(inStorePrice.name)}
              onChange={(e: { target: { value: string } }) => {
                setValue(inStorePrice.name, e.target.value);
                clearErrors([inStorePrice.name]);
              }}
              label={inStorePrice.label}
              value={watch(inStorePrice.name)}
              errorMessage={
                errors?.inStorePrice ? errors.inStorePrice?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              name={collectionPrice.name}
              label={collectionPrice.label}
              onChange={(e: { target: { value: string } }) => {
                setValue(collectionPrice.name, e.target.value);
                clearErrors([collectionPrice.name]);
              }}
              value={watch(collectionPrice.name)}
              errorMessage={
                errors?.collectionPrice ? errors.collectionPrice?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              name={deliveryPrice.name}
              label={deliveryPrice.label}
              onChange={(e: { target: { value: string } }) => {
                setValue(deliveryPrice.name, e.target.value);
                clearErrors([deliveryPrice.name]);
              }}
              value={watch(deliveryPrice.name)}
              errorMessage={
                errors?.deliveryPrice ? errors.deliveryPrice?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Tree
              tree={tree}
              onCheckChanges={onCheckChanges}
              title={
                watch('modifiersTitle')?.length
                  ? watch('modifiersTitle')
                  : 'Add Modifiers'
              }
              searchPlaceholder="Search Modifier"
              keyName={'modifierValues'}
              heading={productsId ? 'Update Modifiers' : 'Add Modifiers'}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(position.name)}
              onChange={(e: { target: { value: string } }) => {
                setValue(position.name, e.target.value);
                clearErrors([position.name]);
              }}
              label={position.label}
              value={watch(position.name)}
              errorMessage={errors?.position ? errors?.position.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="col-sm-12 col-md-6"></div>
            <Field
              type="text"
              {...register(preparationTime.name)}
              label={preparationTime.label}
              onChange={(e: { target: { value: string } }) => {
                setValue('preparationTime', e.target.value);
                clearErrors([preparationTime.name]);
              }}
              value={watch(preparationTime.name)}
              errorMessage={
                errors?.preparationTime ? errors?.preparationTime.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="menulist"
              isFormattedData={true}
              {...register(tax.name)}
              options={taxes}
              defaultValue={formattedOptions(
                watch(tax.name)?.length ? watch(tax.name) : [],
              )}
              label={tax?.label}
              name={tax?.name}
              onChange={(e: any) => {
                const payload = e
                  .map((items: any) => {
                    return {
                      taxName: items?.name,
                      taxDescription: items?.description,
                      id: 0,
                      ids: items?.value,
                      tenantId: null,
                      productId: 0,
                      taxId: items?.value,
                    };
                  })
                  .filter(
                    (items: { taxName?: string }) =>
                      items?.taxName != undefined,
                  );
                setValue(tax.name, payload);
                clearErrors([tax.name]);
              }}
              errorMessage={errors?.tax ? errors.tax?.message : ''}
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register(active.name)}
              checked={watch(active.name)}
              label={active.label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue('active', e.target.checked);
                clearErrors([active.name]);
              }}
              errorMessage={errors?.active ? errors?.active.message : ''}
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register(featuredProduct.name)}
              checked={watch(featuredProduct.name)}
              label={featuredProduct.label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue('featuredProduct', e.target.checked);
                clearErrors([featuredProduct.name]);
              }}
              errorMessage={
                errors?.featuredProduct ? errors?.featuredProduct.message : ''
              }
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register(enableDiscount.name)}
              label={enableDiscount.label}
              checked={watch(enableDiscount.name)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue('enableDiscount', e.target.checked);
                clearErrors([enableDiscount.name]);
              }}
              errorMessage={
                errors?.enableDiscount ? errors?.enableDiscount.message : ''
              }
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
