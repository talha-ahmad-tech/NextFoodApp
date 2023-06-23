import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import {
  UseFormReturn,
  WatchObserver,
  FieldValues,
} from 'react-hook-form/dist/types';
import { productsEndpoints } from 'services/modules/products.api';
// import { useUplaodImageMutation } from 'services/modules/categories.api';
import { CATEGORY_FORM } from '../../types';
import FileUploader from 'components/FileUploader';

const General = ({
  formField,
  formData,
}: {
  formField: CATEGORY_FORM;
  formData: UseFormReturn;
}) => {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = formData;
  const { getOptions } = useGetOptions();
  // const [imageUpload] = useUplaodImageMutation();
  const {
    name = {},
    itemGroupId = { name: '', label: '', id: '' },
    description = {},
    position = {},
    active = {},
    featured = {},
    defaultImage,
    uploadImage,
    categoryCode = {},
    hideOnline = {},
    hideOnPos = {},
  } = formField;

  const onChangeOption =
    (fieldName: string) => (value: { id: string | number }) => {
      setValue(fieldName, value.id);
    };

  return (
    <div>
      <Card noDisplay>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              {...register(categoryCode.name as string)}
              label={categoryCode.label}
              value={watch('categoryCode')}
              readOnly
              disabled
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              {...register(name.name as string)}
              onChange={(e: { target: { value: string } }) =>
                setValue('name', e.target.value)
              }
              placeholder="Enter"
              label={name.label}
              value={watch(name.name as unknown as WatchObserver<FieldValues>)}
              errorMessage={errors?.name ? errors?.name?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              placeholder="Eneter"
              {...register(description.name as string)}
              onChange={(e: { target: { value: string } }) =>
                setValue('description', e.target.value)
              }
              label={description.label}
              value={watch(
                description.name as unknown as WatchObserver<FieldValues>,
              )}
              errorMessage={
                errors?.description ? errors?.description?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="number"
              placeholder="Eneter"
              {...register(position.name as string)}
              onChange={(e: { target: { value: string } }) =>
                setValue('position', e.target.value)
              }
              label={position.label}
              value={watch(
                position.name as unknown as WatchObserver<FieldValues>,
              )}
              errorMessage={errors?.position ? errors?.position?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              {...register('itemGroupId')}
              type="options"
              loadOptions={getOptions({
                endPoint: productsEndpoints?.itemGroupDropdown,
                method: 'get',
                key: 'itemGroupId',
                fieldsToShow: ['name'],
                dataPickFromItems: true,
                baseURLType: 'products',
              })}
              inputValue={watch('itemGroupId')}
              label={itemGroupId.label}
              onChange={(e: { name?: string; id?: number }) => {
                setValue('itemGroupId', e?.id);
                setValue('itemGroupIdName', e?.id);
              }}
              errorMessage={
                errors?.itemGroupId ? errors.itemGroupId?.message : ''
              }
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register(active?.name)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue('active', e.target.checked)
              }
              label={active?.label}
              checked={watch(active?.name)}
            />
            <Field
              type="switch"
              {...register(featured?.name)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue('featured', e.target.checked)
              }
              label={featured?.label}
              checked={watch(featured?.name)}
            />
            <Field
              type="switch"
              {...register(hideOnline?.name)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue('hideOnline', e.target.checked)
              }
              label={hideOnline?.label}
              checked={watch(hideOnline?.name)}
            />
            <Field
              type="switch"
              {...register(hideOnPos?.name)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(hideOnPos.name, e.target.checked)
              }
              label={hideOnPos?.label}
              checked={watch(hideOnPos.name)}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <FileUploader
              type="file"
              {...register(uploadImage?.name as string)}
              appType="products"
              endPoint="file-handler/upload-resource"
              name={uploadImage?.name as string}
              label={uploadImage?.label as string}
              resourceType="1"
              changeUrl={async (value: string) => {
                setValue('uploadImage', await value);
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
