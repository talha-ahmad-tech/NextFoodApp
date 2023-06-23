import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { foodCostingApis } from 'services/modules/foodCosting.api';

const General = ({
  formField,
  formData,
}: {
  formField: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}) => {
  const { getOptions, loadedOptionsFor } = useGetOptions();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = formData;

  const onChangeOption =
    (fieldName: string) => (value: { id: string | number }) => {
      setValue(fieldName, value.id);
    };

  const {
    foodCostingName,
    itemGroupId,
    activeFrom,
    activeTo,
    standardCost,
    totalRetailPrice,
    purchaseTaxGroupId,
    saleTaxGroupId,
    code,
  } = formField;

  return (
    <div>
      <Card Headertitle="General">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              readOnly
              {...register(code.name)}
              label={code.label}
              value={watch(code.name)}
              errorMessage={errors.code ? errors.code?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('foodCostingName')}
              onChange={(e: { target: { value: string } }) =>
                setValue('foodCostingName', e.target.value)
              }
              label={ foodCostingName.label}
              value={watch('foodCostingName')}
              errorMessage={errors?.foodCostingName ? errors?.foodCostingName?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="options"
              {...register(itemGroupId.name)}
              loadOptions={getOptions({
                endPoint: foodCostingApis.foodCostingItemGroup,
                method: 'get',
                key: 'itemGroupId',
                fieldsToShow: ['name'],
                v2: false,
                dataPickFromItems: true,
              })}
              inputValue={
                loadedOptionsFor['itemGroupId']
                  ? watch(itemGroupId.name)
                  : 'Select Item Group'
              }
              label={itemGroupId.label}
              onChange={onChangeOption('itemGroupId')}
              errorMessage={
                errors?.itemGroupId ? errors.itemGroupId?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="date"
              {...register(activeFrom.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(activeFrom.name, e.target.value)
              }
              label={activeFrom.label}
              value={watch(activeFrom.name)}
              errorMessage={
                errors?.activeFrom ? errors.activeFrom?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="date"
              {...register(activeTo.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(activeTo.name, e.target.value)
              }
              label={activeTo.label}
              value={watch(activeTo.name)}
              errorMessage={errors?.activeTo ? errors.activeTo?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              name={standardCost.name}
              label={standardCost.label}
              onChange={(e: { target: { value: string } }) =>
                setValue(standardCost.name, e.target.value)
              }
              value={watch(standardCost.name)}
              errorMessage={
                errors?.standardCost ? errors.standardCost?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              {...register(totalRetailPrice.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(totalRetailPrice.name, e.target.value)
              }
              label={totalRetailPrice.label}
              value={watch(totalRetailPrice.name)}
              errorMessage={
                errors?.totalRetailPrice ? errors?.totalRetailPrice.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="options"
              {...register(purchaseTaxGroupId.name)}
              loadOptions={getOptions({
                endPoint: foodCostingApis.foodCostingTaxGroup,
                method: 'get',
                key: 'purchaseTaxGroupId',
                fieldsToShow: ['name'],
                v2: false,
                dataPickFromItems: true,
              })}
              inputValue={
                loadedOptionsFor['purchaseTaxGroupId']
                  ? watch(purchaseTaxGroupId.name)
                  : 'Select Purchase Tax Group'
              }
              label={purchaseTaxGroupId.label}
              onChange={onChangeOption('purchaseTaxGroupId')}
              errorMessage={
                errors?.purchaseTaxGroupId
                  ? errors?.purchaseTaxGroupId.message
                  : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="options"
              {...register(saleTaxGroupId.name)}
              loadOptions={getOptions({
                endPoint: foodCostingApis.foodCostingTaxGroup,
                method: 'get',
                key: 'saleTaxGroup',
                fieldsToShow: ['name'],
                v2: false,
                dataPickFromItems: true,
              })}
              inputValue={
                loadedOptionsFor['saleTaxGroup']
                  ? watch(saleTaxGroupId.name)
                  : 'Select Sale Tax Group'
              }
              name={saleTaxGroupId.name}
              label={saleTaxGroupId.label}
              onChange={onChangeOption('saleTaxGroupId')}
              errorMessage={
                errors?.saleTaxGroupId ? errors.saleTaxGroupId?.message : ''
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
