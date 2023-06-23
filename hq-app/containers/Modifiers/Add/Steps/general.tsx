/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { UseFormReturn } from 'react-hook-form/dist/types';
import ModifierLines from './ModifierLines';
import { useModifier } from './useModifier';

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
    formState: { errors },
  } = formData;

  const { name, description, position, compulsory, maxSelectionAllowed } =
    formField;

  const { addNewValue, deleteValue } = useModifier();

  return (
    <div>
      <Card Headertitle="Modifier" className="m-0">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              placeholder="Enter"
              {...register('name')}
              label={name.label}
              value={watch(name.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(name.name, e.target.value)
              }
              errorMessage={errors.name ? errors.name?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              placeholder="Enter"
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
              type="number"
              placeholder="Enter"
              name={position.name}
              label={position.label}
              onChange={(e: { target: { value: string } }) =>
                setValue(position.name, e.target.value)
              }
              value={watch(position.name)}
              errorMessage={errors?.position ? errors.position?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="row d-flex justify-content-center align-items-center">
              <Field
                type="number"
                placeholder="Enter"
                {...register('maxSelectionAllowed')}
                onChange={(e: { target: { value: string } }) =>
                  setValue('maxSelectionAllowed', e.target.value)
                }
                label={maxSelectionAllowed.label}
                value={watch('maxSelectionAllowed')}
                errorMessage={
                  errors?.maxSelectionAllowed
                    ? errors?.maxSelectionAllowed?.message
                    : ''
                }
              />
            </div>
          </div>

          <div className="col-sm-6 col-md-6">
            <Field
              type="switch"
              {...register(compulsory.name)}
              onChange={(e: { target: { checked: boolean } }) =>
                setValue('compulsory', e.target.checked)
              }
              defaultChecked={watch('compulsory')}
              label={compulsory.label}
              value={watch(compulsory.name)}
            />
          </div>
        </div>
        <div className="border" />
        <div className="row d-flex">
          <div className="col-md-6 col-sm-12 justify-content-end">
            <h6>Modifier Values</h6>
          </div>
          <div className="col-md-6 col-sm-12  d-flex justify-content-end mb-3">
            <button
              className="btn btn-outline-primary friday-btn-md font-medium ms-2"
              onClick={() => deleteValue()}
              type="button"
            >
              Delete
            </button>
            <button
              className="friday-btn-primary friday-btn-md font-medium ms-2"
              onClick={() => addNewValue()}
              type="button"
            >
              Add Value
            </button>
          </div>
        </div>
        <div className="row">
          <ModifierLines />
        </div>
      </Card>
    </div>
  );
};
export default General;
