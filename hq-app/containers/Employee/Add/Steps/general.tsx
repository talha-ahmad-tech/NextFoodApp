import { useSelectionGetter } from '@/utils/customHooks/useGetOtions';
import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { ChangeEvent, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { EmployeeApis, useFetchPinsQuery } from 'services/modules/employee.api';

const employeeTypeList = [
  { value: 0, name: 'Head Office Employee' },
  { value: 1, name: 'Store Employee' },
];
const payTypeList = [
  { value: 0, name: 'Hourly Pay' },
  { value: 1, name: 'Fixed Weekly Pay' },
  { value: 2, name: 'Monthly Pay Rate' },
];

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
    formState: { errors },
    getValues,
  } = formData;
  const { data } = useFetchPinsQuery({});
  const GeneratePinNumber = data?.number;
  const [pin, setPin] = useState();
  const {
    employeeId,
    employeeName,
    employeeType,
    role,
    password,
    pinNumber,
    payType,
    payDetails,
    stores,
    active,
    number,
    email,
  } = formField;

  const roleOptions = useSelectionGetter({
    isFormattedData: true,
    endPoint: EmployeeApis.RoleLookup,
    method: 'GET',
    key: 'role',
    fieldsToShow: ['name'],
    baseURLType: 'core',
  });

  const storesOptions = useSelectionGetter({
    isFormattedData: true,
    endPoint: EmployeeApis.StoresLookup,
    method: 'get',
    key: 'stores',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    baseURLType: 'core',
  });

  useEffect(() => {
    if (data) {
      setPin(GeneratePinNumber);
    }
  }, [data]);
  const values = getValues();

  const formattedOptionsSimpleName = (data: { [key: string]: string }[]) =>
    data?.map((items: { [key: string]: string }) => {
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
              {items?.name ? items.name : items.id}
            </span>
          </div>
        ),

        value: items?.id,
      };
    });

  return (
    <div>
      <Card Headertitle="General" noCardWrapper>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('employeeId')}
              onChange={(e: { target: { value: string } }) =>
                setValue('employeeId', e.target.value)
              }
              label={employeeId.label}
              value={watch('employeeId')}
              errorMessage={
                errors?.employeeId ? errors?.employeeId?.message : ''
              }
              disabled
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('employeeName')}
              onChange={(e: { target: { value: string } }) =>
                setValue('employeeName', e.target.value)
              }
              label={employeeName.label}
              value={watch('employeeName')}
              errorMessage={
                errors?.employeeName ? errors?.employeeName?.message : ''
              }
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register('employeeType')}
              onChange={(e: { name?: string; value?: number }) =>
                setValue('employeeType', e?.value)
              }
              clear
              closeMenuOnSelect
              options={employeeTypeList}
              label={employeeType.label}
              value={watch('employeeType')}
              errorMessage={
                errors?.employeeType ? errors?.employeeType?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="list"
              isFormattedData={true}
              {...register(role.name)}
              isMulti={true}
              options={roleOptions}
              defaultValue={formattedOptionsSimpleName(
                watch(role.name)?.length ? watch(role.name) : [],
              )}
              label={role.label}
              onChange={(e?: Array<object>) => {
                const event = e?.map(
                  (item: { item?: object; name?: string }) => item.name,
                );
                setValue('role', event);
                setValue('roleIdName', event);
              }}
              errorMessage={errors?.role ? errors.role?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('number')}
              onChange={(e: { target: { value: string } }) =>
                setValue('number', e.target.value)
              }
              label={number.label}
              value={watch('number')}
              errorMessage={errors?.number ? errors?.number?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('email')}
              onChange={(e: { target: { value: string } }) =>
                setValue('email', e.target.value)
              }
              label={email.label}
              value={watch('email')}
              errorMessage={errors?.email ? errors?.email?.message : ''}
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register('payType')}
              onChange={(e: { name?: string; value?: number }) =>
                setValue('payType', e?.value)
              }
              clear
              closeMenuOnSelect
              options={payTypeList}
              label={payType.label}
              value={watch('payType')}
              errorMessage={errors?.payType ? errors?.payType?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('payDetails')}
              onChange={(e: { target: { value: string } }) =>
                setValue('payDetails', e.target.value)
              }
              label={payDetails.label}
              value={watch('payDetails')}
              errorMessage={
                errors?.payDetails ? errors?.payDetails?.message : ''
              }
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="multiselect"
              componentType="list"
              isFormattedData={true}
              {...register(stores.name)}
              options={storesOptions}
              defaultValue={formattedOptionsSimpleName(
                watch(stores.name)?.length ? watch(stores.name) : [],
              )}
              label={stores?.label}
              name={stores?.name}
              onChange={(e?: Array<object>) => {
                const event = e?.map(
                  (item: { item?: object; name?: string; id?: number }) =>
                    item.id,
                );
                setValue('stores', event);
                setValue('storeIdName', event);
              }}
              errorMessage={errors?.stores ? errors.stores?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              {...register('active')}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue('active', e?.target.checked);
              }}
              checked={watch(active.name)}
              label={active.label}
              value={watch('active')}
              defaultValue={false}
            />
          </div>
          <div
            className="row pt-4"
            style={{ borderTop: '1px solid rgba(36, 40, 44, 0.1)' }}
          ></div>
          <h6 className="col-sm-6 mb-4">Credentials</h6>
          <div className="col-sm-6 mb-4">
            <div className="row">
              <div className="col-12 col-lg-5 col-xxl-3"></div>
              <div className="col-12 col-lg-7 col-xxl-9">
                <div className="button-text-wrapper d-flex align-items-end justify-content-end">
                  <button
                    className="friday-btn-primary outline-btn"
                    onClick={() => {
                      setValue('pinNumber', pin);
                    }}
                    type="button"
                  >
                    Generate Pin
                  </button>
                </div>
              </div>
            </div>
          </div>
          {values?.id ? null : (
            <div className="col-sm-12 col-md-6">
              <Field
                type="text"
                {...register('password')}
                onChange={(e: { target: { value: string } }) =>
                  setValue('password', e.target.value)
                }
                label={password.label}
                value={watch('password')}
                errorMessage={errors?.password ? errors?.password?.message : ''}
              />
            </div>
          )}
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register('pinNumber')}
              onChange={(e: { target: { value: string } }) =>
                setValue('pinNumber', e.target.value)
              }
              label={pinNumber.label}
              value={watch('pinNumber')}
              errorMessage={errors?.pinNumber ? errors?.pinNumber?.message : ''}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default General;
