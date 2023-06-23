import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';

import type {
  FieldValues,
  UseFormReturn,
  WatchObserver,
} from 'react-hook-form/dist/types';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { productsEndpoints } from 'services/modules/products.api';
import { useFetchDealsModifiersQuery } from 'services/modules/productsdeal.api';

import { useEffect, useState } from 'react';
import { useProductDealLinesHook } from '../../productDealLinesHook';
import { Tree } from '@fridayfood/shared/components';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setComponentName } from '../../productsdeal.slice';
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
  const router = useRouter();
  const { id: dealsId = 0 } = router.query || 0;

  const { getOptions } = useGetOptions();
  const {
    register,
    watch,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = formData;

  const {
    productId,
    productName,
    description,
    categoryId,
    itemGroupId,
    saleUom,

    inStorePrice,
    deliveryPrice,
    collectionPrice,
    position,
    preparationTime,
    active,
    featuredProduct,
    enableDiscount,
    imageUrl,
  } = formField;

  const [tree, setTree] = useState([]);

  const { lines, setLines } = useProductDealLinesHook();
  const dispatch = useDispatch();
  const values = getValues();
  const { data, isSuccess } = useFetchDealsModifiersQuery(1);
  // const modifiersDetails = dealsId ? values?.modifiersDetail : [];

  const modifiersDetails =
    dealsId && values?.modifiersDetail?.length ? values?.modifiersDetail : [];

  let dealModifierValues = [] as string[];
  modifiersDetails?.forEach((dealMod: { dealModifierValues: [] }) => {
    dealModifierValues = [
      ...dealModifierValues,
      ...dealMod?.dealModifierValues,
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
            modifiersDetails?.find((foundItem: { modifierId?: number }) => {
              if (items?.id === foundItem?.modifierId) {
                return items?.id;
              } else {
                items = { ...items };
                return undefined;
              }
            })
          ) {
            const resultants = items?.modifierValues?.map(
              (value: { name: string; id?: number }) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dealModifierValues?.find((founded: any) => {
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
              },
            );
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

  let payload = {} as object;
  let resultants = {} as object;

  const onCheckChanges = (event: { modifiers: []; selectedItem: string }) => {
    const values = event?.modifiers?.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (outerItems: { [key: string]: string | [] } | any) => {
        let modify = {
          id: 0,
          modifierId: 0,
          name: '',
          dealModifierValues: [],
          dealId: 0,
        } as object;

        let nestedVlaues = [] as object[];
        outerItems?.forEach(
          (innerItems: {
            modifierId: number;
            dealModifierId: number;
            modifierValueId: number;
            id: number;
            name?: string;
          }) => {
            nestedVlaues = [
              ...nestedVlaues,
              {
                id: 0,
                dealModifierId: 0,
                modifierValueId: innerItems?.id,
                tenantId: null,
              },
            ];
            modify = {
              ...modify,
              tenantId: null,
              id: 0,
              name: innerItems?.name,
              modifierId: innerItems?.modifierId,
              dealId: dealsId ? Number(dealsId) : 0,
              dealModifierValues: [...nestedVlaues],
            };
            payload = { ...payload, ...modify };
          },
        );
        resultants = { ...resultants, ...payload };
        return resultants;
      },
    );

    // setValue('modifiers', event?.selectedItem);
    setValue(
      'modifiersTitle',
      event?.selectedItem?.length ? event?.selectedItem : 'Add Modifiers',
    );
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
                dispatch(setComponentName(e.target.value));
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
              inputValue={watch(['items']) || watch([itemGroupId.name])}
              defaultInputValue={watch(['items']) || watch([itemGroupId.name])}
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
                    watch(itemGroupId?.name),
                  ),
                  method: 'get',
                  key: 'categoryId',
                  fieldsToShow: ['name'],
                  dataPickFromItems: true,
                  baseURLType: 'products',
                })}
                inputValue={watch(['categoryName']) || watch([categoryId.name])}
                defaultInputValue={
                  watch(['categoryName']) || watch([itemGroupId.name])
                }
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
                setValue('saleUom', e?.id);
                setValue('saleUomName', e?.name);
                setValue('saleUomDetail', e?.id);
                clearErrors([saleUom.name]);
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
          {/* <div className="col-sm-12 col-md-6">
            <Tree
              tree={tree}
              onCheckChanges={onCheckChanges}
              title={
                watch('modifiersTitle')?.length
                  ? watch('modifiersTitle')
                  : 'Add Modifiers'
              }
              keyName={'modifierValues'}
              heading={dealsId ? 'Update Modifiers' : 'Add Modifiers'}
            />
          </div> */}
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
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
