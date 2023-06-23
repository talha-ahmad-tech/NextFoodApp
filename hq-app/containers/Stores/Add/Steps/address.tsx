import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { PAGINATION } from '@/utils/helper';
import { Card } from '@fridayfood/shared/components';
import { Field } from '@fridayfood/ui-toolkit';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { StoresApis } from 'services/modules/stores.api';

const StoreAddress = ({
  formField,
  formData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formField: { [key: string]: any };
  formData: UseFormReturn;
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = formData;
  const { address, contactNumber, email, countryId, cityId, stateId } =
    formField;
  const [countryID, setCountryID] = useState<number>();
  const [stateID, setStateID] = useState<number>();
  const { getOptions, loadedOptionsFor } = useGetOptions();

  return (
    <div>
      <Card Headertitle="Address">
        <div className="row m-0">
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(contactNumber.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(contactNumber.name, e.target.value)
              }
              label={contactNumber.label}
              value={watch(contactNumber.name)}
              errorMessage={
                errors?.contactNumber ? errors?.contactNumber?.message : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(email.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(email.name, e.target.value)
              }
              label={email.label}
              value={watch(email.name)}
              errorMessage={errors?.email ? errors?.email?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="text"
              {...register(address.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(address.name, e.target.value)
              }
              label={address.label}
              value={watch(address.name)}
              errorMessage={errors?.address ? errors?.address?.message : ''}
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              type="options"
              {...register(countryId.name)}
              loadOptions={getOptions({
                endPoint: StoresApis.GetCountries,
                method: 'GET',
                key: 'countryId',
                params: { PageIndex: 1, PageSize: PAGINATION },
                fieldsToShow: ['name'],
                baseURLType: 'core',
                dataPickFromItems: true,
              })}
              inputValue={
                loadedOptionsFor['countryId']
                  ? watch(countryId?.name)
                  : watch('countryId')
                  ? String(watch('countryId'))
                  : 'Select ...'
              }
              label={countryId.label}
              onChange={(e: {
                e: object;
                id: number;
                name: string;
                value: number | string;
              }) => {
                setValue('countryId', e?.value);
                setValue('countryName', e?.name);
                setValue('countryNameId', e?.value);
                setCountryID(e?.id);
              }}
              errorMessage={errors?.countryId ? errors.countryId?.message : ''}
            />
          </div>
          {countryID ? (
            <div className="col-sm-12 col-md-6">
              <Field
                type="options"
                {...register(stateId.name)}
                loadOptions={
                  countryID
                    ? getOptions({
                        endPoint: `${StoresApis.GetStates(Number(countryID))}`,
                        key: 'stateId',
                        fieldsToShow: ['name'],
                        baseURLType: 'core',
                        params: { PageIndex: 1, PageSize: PAGINATION },
                        dataPickFromItems: true,
                      })
                    : () => ({ options: [], hasMore: false })
                }
                inputValue={
                  loadedOptionsFor['stateId']
                    ? watch(stateId?.name)
                    : watch('stateId')
                    ? String(watch('stateId'))
                    : 'Select ...'
                }
                label={stateId.label}
                onChange={(e: {
                  e: object;
                  id: number;
                  name: string;
                  value: number | string;
                }) => {
                  setValue('stateId', e?.value);
                  setValue('stateName', e?.name);
                  setValue('stateNameId', e?.value);
                  setStateID(e?.id);
                }}
                errorMessage={errors?.stateId ? errors.stateId?.message : ''}
              />
            </div>
          ) : null}

          {stateID ? (
            <div className="col-sm-12 col-md-6">
              <Field
                type="options"
                {...register(cityId.name)}
                loadOptions={
                  stateID
                    ? getOptions({
                        endPoint: `${StoresApis.GetCities(Number(stateID))}`,
                        key: 'cityId',
                        fieldsToShow: ['name'],
                        baseURLType: 'core',
                        params: { PageIndex: 1, PageSize: PAGINATION },
                        dataPickFromItems: true,
                      })
                    : () => ({ options: [], hasMore: false })
                }
                inputValue={
                  loadedOptionsFor['cityId']
                    ? watch(cityId?.name)
                    : watch('cityId')
                    ? String(watch('cityId'))
                    : 'Select ...'
                }
                label={cityId.label}
                onChange={(e: {
                  e: object;
                  id: number;
                  name: string;
                  value: number | string;
                }) => {
                  setValue('cityId', e?.value);
                  setValue('cityName', e?.name);
                  setValue('cityNameId', e?.value);
                }}
                errorMessage={errors?.cityId ? errors.cityId?.message : ''}
              />
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
};
export default StoreAddress;
