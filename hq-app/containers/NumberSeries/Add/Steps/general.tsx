import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { UseFormReturn } from 'react-hook-form/dist/types';

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
    formState: { errors },
  } = formData;

  const value = getValues();

  const { Module, min, form, max, isOverwrite, continuous, prefix, suffix } =
    formField;

  return (
    <div>
      <Card Headertitle="General">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <Field
                  type="text"
                  {...register('Module')}
                  onChange={(e: { target: { value: string } }) =>
                    setValue('Module', e.target.value)
                  }
                  label={Module.label}
                  value={watch('Module')}
                  errorMessage={errors?.Module ? errors?.Module?.message : ''}
                />
              </div>
              {/* <div className="col-sm-12 col-md-4"></div> */}
              <div className="col-sm-12 col-md-12">
                <Field
                  type="text"
                  {...register(form.name)}
                  onChange={(e: { target: { value: string } }) =>
                    setValue(form.name, e?.target?.value)
                  }
                  label={form.label}
                  value={watch(form.name)}
                  errorMessage={errors?.form ? errors.form?.message : ''}
                />
              </div>

              <div className="col-sm-12 col-md-6">
                <Field
                  type="switch"
                  {...register(prefix.name)}
                  onChange={(e: { target: { checked: boolean } }) => {
                    setValue(prefix.name, e.target.checked);
                  }}
                  label={prefix.label}
                  checked={watch(prefix.name)}
                  errorMessage={errors?.prefix ? errors.prefix?.message : ''}
                  isHalfWidth
                />
              </div>
              <div className="col-sm-12 col-md-3">
                {value.prefix && (
                  <Field
                    {...register('prefixText')}
                    onChange={(e: { target: { value: string } }) =>
                      setValue('prefixText', e.target.value)
                    }
                    label={''}
                    value={watch('prefixText')}
                    isFullWidth={true}
                    negativeMargin
                  />
                )}
              </div>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="switch"
                  {...register(suffix.name)}
                  onChange={(e: { target: { checked: boolean } }) =>
                    setValue(suffix.name, e.target.checked)
                  }
                  label={suffix.label}
                  checked={watch(suffix.name)}
                  errorMessage={errors?.suffix ? errors.suffix?.message : ''}
                  isHalfWidth
                />
              </div>
              <div className="col-sm-12 col-md-3">
                {value.suffix && (
                  <Field
                    {...register('suffixText')}
                    onChange={(e: { target: { value: string } }) =>
                      setValue('suffixText', e.target.value)
                    }
                    label={''}
                    value={watch('suffixText')}
                    isFullWidth={true}
                    negativeMargin
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-5">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <Field
                  type="switch"
                  {...register(min.name)}
                  onChange={(e: { target: { checked: boolean } }) => {
                    setValue(min.name, e.target.checked);
                  }}
                  closeMenuOnSelect
                  options={[]}
                  label={min.label}
                  checked={watch(min.name)}
                  errorMessage={errors?.min ? errors.min?.message : ''}
                  isHalfWidth
                />
              </div>
              <div className="col-sm-12 col-md-2">
                {value.min && (
                  <Field
                    {...register('minNumber')}
                    onChange={(e: { target: { value: string } }) =>
                      setValue('minNumber', e.target.value)
                    }
                    label={''}
                    value={watch('minNumber')}
                    isFullWidth={true}
                  />
                )}
              </div>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="switch"
                  {...register(max.name)}
                  onChange={(e: { target: { checked: boolean } }) => {
                    console.log('e', e);

                    setValue(max.name, e.target.checked);
                  }}
                  closeMenuOnSelect
                  options={[]}
                  label={max.label}
                  checked={watch(max.name)}
                  errorMessage={errors?.max ? errors.max?.message : ''}
                  isHalfWidth
                />
              </div>
              <div className="col-sm-12 col-md-3">
                {value.max && (
                  <Field
                    {...register('maxNumber')}
                    onChange={(e: { target: { value: string } }) => {
                      setValue('maxNumber', e.target.value);
                    }}
                    label={''}
                    value={watch('maxNumber')}
                    isFullWidth={true}
                  />
                )}
              </div>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="switch"
                  {...register(isOverwrite.name)}
                  onChange={(e: { target: { checked: boolean } }) =>
                    setValue(isOverwrite.name, e.target.checked)
                  }
                  label={isOverwrite.label}
                  checked={watch(isOverwrite.name)}
                  errorMessage={
                    errors?.isOverwrite ? errors.isOverwrite?.message : ''
                  }
                  isHalfWidth
                />
              </div>
              <div className="col-sm-12 col-md-6"></div>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="switch"
                  {...register(continuous.name)}
                  onChange={(e: { target: { checked: boolean } }) =>
                    setValue(continuous.name, e.target.checked)
                  }
                  label={continuous.label}
                  checked={watch(continuous.name)}
                  errorMessage={
                    errors?.continuous ? errors.continuous?.message : ''
                  }
                  isHalfWidth
                />
              </div>
              {/* <div className="col-sm-12 col-md-6"></div> */}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
