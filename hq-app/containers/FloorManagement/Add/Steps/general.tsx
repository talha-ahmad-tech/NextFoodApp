/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { ColorInput } from '@fridayfood/ui-toolkit/src/FormFields';

const General = ({
  formField,
  formData,
}: {
  formField: { [key: string]: any };

  formData: UseFormReturn<any>;
}) => {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = formData;

  const { name, noOfSeats, noOfTables, vacant, serving, reserved, floorArea } =
    formField;

  return (
    <div>
      <Card Headertitle="Add Floor">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('name')}
              label={name.label}
              placeholder="Enter"
              onChange={(e: { target: { value: string } }) => {
                setValue('name', e.target.value);
                clearErrors(['name']);
              }}
              value={watch('name')}
              errorMessage={errors?.name ? errors?.name?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6 d-flex" style={{ height: '20px' }}>
            <Field
              type="number"
              placeholder="W:"
              {...register('width')}
              label={floorArea.label}
              marginRight={true}
              onChange={(e: { target: { value: string } }) => {
                setValue('width', e.target.value);
                clearErrors(['width']);
              }}
              value={watch('width')}
            />
            <Field
              type="number"
              placeholder="H:"
              {...register('height')}
              onChange={(e: { target: { value: string } }) => {
                setValue('height', e.target.value);
                clearErrors(['height']);
              }}
              isFullWidth
              value={watch('height')}
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="number"
              {...register('noOfTables')}
              label={noOfTables.label}
              placeholder="Enter"
              onChange={(e: { target: { value: string } }) => {
                setValue('noOfTables', e.target.value);
                clearErrors(['noOfTables']);
              }}
              value={watch('noOfTables')}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="number"
              {...register('noOfSeats')}
              placeholder="Enter"
              label={noOfSeats.label}
              onChange={(e: { target: { value: string } }) => {
                setValue('noOfSeats', e.target.value);
                clearErrors(['noOfSeats']);
              }}
              value={watch('noOfSeats')}
            />
          </div>
          <div className="col-sm-12 col-md-6 d-flex">
            <div className="col-12  col-lg-5 col-xxl-3">
              <label className="col-form-label form-label-required">
                Table Color Codes
              </label>
            </div>
            <ColorInput
              label={vacant.name}
              {...register('vacant')}
              value={watch('vacant')}
              onChange={(e: { target: { value: any } }) => {
                setValue('vacant', e.target.value);
                clearErrors(['vacant']);
              }}
            />
            <ColorInput
              label={serving.name}
              {...register('serving')}
              value={watch('serving')}
              onChange={(e: { target: { value: any } }) => {
                setValue('serving', e.target.value);
                clearErrors(['serving']);
              }}
            />
            <ColorInput
              label={reserved.name}
              {...register('reserved')}
              value={watch('reserved')}
              onChange={(e: { target: { value: any } }) => {
                setValue('reserved', e.target.value);
                clearErrors(['reserved']);
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
