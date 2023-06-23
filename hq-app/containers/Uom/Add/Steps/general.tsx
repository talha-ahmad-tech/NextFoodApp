import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { UomApis } from 'services/modules/uom.api';
import { PAGINATION } from '@/utils/helper';
// import UOMLinesEnhancer from '../UOMLines';

const General = ({
  formField,
  formData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formField: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}) => {
  const { getOptions, loadedOptionsFor } = useGetOptions();

  const {
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = formData;
  const onChangeOption =
    (fieldName: string) => (value: { id: string | number }) => {
      setValue(fieldName, value.id);
    };

  const { uomName, description, classType } = formField;
  return (
    <div>
      <Card Headertitle="Add UOM">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(uomName.name)}
              onChange={(e: { target: { value: string } }) => {
                setValue(uomName.name, e.target.value);
                clearErrors(['uomNam']);
              }}
              placeholder="Enter"
              label={uomName.label}
              value={watch(uomName.name)?.length ? watch(uomName.name) : ''}
              errorMessage={errors?.uomName ? errors?.uomName?.message : ''}
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

          {/* <div className="col-sm-12 col-md-6">
            <Field
              type="options"
              {...register(classType.name)}
              loadOptions={getOptions({
                endPoint: UomApis.ListUOM,
                method: 'get',
                key: 'classType',
                fieldsToShow: ['name'],
                v2: false,
                dataPickFromItems: true,
                params: { PageIndex: 1, PageSize: PAGINATION },
              })}
              inputValue={
                loadedOptionsFor['classType']
                  ? watch(classType.name)
                  : 'Select Item Group'
              }
              label={classType.label}
              onChange={onChangeOption('classType')}
              errorMessage={errors?.classType ? errors.classType?.message : ''}
            />
          </div> */}
        </div>
        {/* <div className="border" />
        <div className="row d-flex">
          <div className="col-md-6 col-sm-12 justify-content-end">
            <h6>Conversion</h6>
          </div>
        </div>

        <div className="row">
          <UOMLinesEnhancer />
        </div>
        <div className="form-footer-actions">
          <div className="container-fluid">
            <div className="col-12 custom-footer-links"></div>
          </div>
        </div> */}
      </Card>
    </div>
  );
};
export default General;
