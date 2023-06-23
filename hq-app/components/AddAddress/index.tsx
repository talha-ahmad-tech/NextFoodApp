import React, { useEffect, useState } from 'react';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import ModalCustom from '@fridayfood/ui-toolkit/src/Modal';
import {
  addDeleteandEditFunctions,
  columnDefs,
  columnDefsSimpleAddress,
  columnDefsEmploy,
} from './Helper';
import { AddressFormModel } from './formModel';
import { useFormik } from 'formik';
import {
  formInitialValues,
  validationSchema,
  validationSchemaSimpleAddress,
} from './validationSchema';
import { ApiEndPoint } from './apiEndPoints';
import type { RowSelectedEvent } from 'ag-grid-community';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import { PAGINATION } from '@/utils/helper';
import AgGridGeneric from '@fridayfood/shared/components/AgGridForm/AgGridGeneric';

const AddressDetailsForm = ({
  setAddressValue,
  fieldToSet,
  singleAddress = false,
  simpleAddress = false,
  employ = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAddressValue?: any;
  fieldToSet?: string;
  singleAddress?: boolean;
  simpleAddress?: boolean;
  employ?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) => {
  const { address, contactNumber, email, countryId, cityId, stateId } =
    AddressFormModel.formField;

  const { setValue, getValues } = setAddressValue;

  const editValues = getValues();
  const editId = editValues?.id;
  const editAddress = editValues?.addresses;

  const { placeholders, loadedOptionsFor, getOptions } = useGetOptions() || {};
  const [show, setShow] = useState(false);
  const [countryID, setCountryID] = useState<number>();
  const [stateID, setStateId] = useState<number>();
  const {
    values,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: formInitialValues,
    onSubmit: values => {
      const previousAddresses = editValues?.addresses
        ? [...editValues?.addresses]
        : [];
      setValue(fieldToSet, [...previousAddresses, values]);
      setShow(false);
      resetForm();
    },
    validationSchema: simpleAddress
      ? validationSchemaSimpleAddress
      : validationSchema,
  });

  const onRowSelect = (event: RowSelectedEvent) => {
    const selectedRowValues = event.api.getSelectedRows();
    if (singleAddress) {
      setValue(fieldToSet, selectedRowValues[0]);
    } else {
      setValue(fieldToSet, selectedRowValues);
    }
  };

  useEffect(() => {
    if (editId && editAddress) {
      if (singleAddress) {
        setValue(fieldToSet, [editAddress]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actionBtns = [
    {
      title: 'Add',
      onClick: () => {
        setShow(true);
      },
    },
  ];

  const handleDelete = () => {
    setFieldValue(editValues?.addresses, {});
    setValue('addresses', []);
  };
  const handleEdit = () => {
    const value = editValues.addresses[0];
    setFieldValue(address.name, value.address);
    setFieldValue(contactNumber.name, value.contactNumber);
    setFieldValue(email.name, value.email);
    setFieldValue(countryId.name, value.countryId);
    setFieldValue(cityId.name, value.cityId);
    setFieldValue(stateId.name, value.stateId);
    setShow(true);
  };

  return (
    <>
      <ModalCustom
        saveButtonType={'button'}
        show={show}
        handleSave={handleSubmit}
        close={() => setShow(false)}
        title={'Address'}
      >
        {simpleAddress ? (
          <>
            <div className="row m-0">
              <div className="col-sm-12 col-md-6">
                <Field
                  name={address.name}
                  label={address.label}
                  value={values?.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    touched.address && errors.address ? errors.address : ''
                  }
                />
              </div>

              <div className="col-sm-12 col-md-6">
                <Field
                  type="options"
                  name={countryId.name}
                  label={countryId.label}
                  onChange={(e: {
                    value: string;
                    name: string;
                    id: number;
                  }) => {
                    setFieldValue('countryId', e?.value);
                    setFieldValue('countryName', e?.name);
                    setCountryID(e?.id);
                  }}
                  inputValue={
                    loadedOptionsFor['countryId']
                      ? values.countryId
                      : placeholders.countryId
                  }
                  loadOptions={getOptions({
                    endPoint: ApiEndPoint.GetCountries,
                    key: 'countryId',
                    fieldsToShow: ['name'],
                    baseURLType: 'core',
                    params: { PageIndex: 1, PageSize: PAGINATION },
                    dataPickFromItems: true,
                  })}
                  onBlur={handleBlur}
                  errorMessage={
                    touched.countryId && errors.countryId
                      ? errors.countryId
                      : ''
                  }
                />
              </div>

              <div className="col-sm-12 col-md-6">
                <Field
                  type="options"
                  name={stateId.name}
                  label={stateId.label}
                  onChange={(e: {
                    value: string;
                    name: string;
                    id: number;
                  }) => {
                    setFieldValue('stateId', e?.value);
                    setFieldValue('stateName', e?.name);
                    setStateId(e?.id);
                  }}
                  cacheUniqs={[countryID]}
                  inputValue={
                    loadedOptionsFor['stateId']
                      ? values.stateId
                      : placeholders.stateId
                  }
                  loadOptions={
                    countryID
                      ? getOptions({
                          endPoint: `${ApiEndPoint.GetStates(
                            Number(countryID),
                          )}`,
                          key: 'stateId',
                          fieldsToShow: ['name'],
                          baseURLType: 'core',
                          params: { PageIndex: 1, PageSize: PAGINATION },
                          dataPickFromItems: true,
                        })
                      : () => ({ options: [], hasMore: false })
                  }
                  onBlur={handleBlur}
                  errorMessage={
                    touched.stateId && errors.stateId ? errors.stateId : ''
                  }
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="options"
                  name={cityId.name}
                  label={cityId.label}
                  onChange={(e: { value: string; name: string }) => {
                    setFieldValue('cityId', e?.value);
                    setFieldValue('cityName', e?.name);
                  }}
                  inputValue={
                    loadedOptionsFor['cityId']
                      ? values.cityId
                      : placeholders.cityId
                  }
                  cacheUniqs={[stateID]}
                  loadOptions={
                    stateID
                      ? getOptions({
                          endPoint: `${ApiEndPoint.GetCities(Number(stateID))}`,
                          key: 'cityId',
                          fieldsToShow: ['name'],
                          baseURLType: 'core',
                          params: { PageIndex: 1, PageSize: PAGINATION },
                          dataPickFromItems: true,
                        })
                      : () => ({ options: [], hasMore: false })
                  }
                  onBlur={handleBlur}
                  errorMessage={
                    touched.cityId && errors.cityId ? errors.cityId : ''
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row m-0">
              <div className="col-sm-12 col-md-6">
                <Field
                  name={address.name}
                  label={address.label}
                  value={values?.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    touched.address && errors.address ? errors.address : ''
                  }
                />
              </div>
              {!employ && (
                <>
                  <div className="col-sm-12 col-md-6">
                    <Field
                      name={contactNumber.name}
                      label={contactNumber.label}
                      value={values?.contactNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={
                        touched.contactNumber && errors.contactNumber
                          ? errors.contactNumber
                          : ''
                      }
                    />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <Field
                      name={email.name}
                      label={email.label}
                      value={values?.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={
                        touched.email && errors.email ? errors.email : ''
                      }
                    />
                  </div>
                </>
              )}

              <div className="col-sm-12 col-md-6">
                <Field
                  type="options"
                  name={countryId.name}
                  label={countryId.label}
                  onChange={(e: {
                    value: string;
                    name: string;
                    id: number;
                  }) => {
                    setFieldValue('countryId', e?.value);
                    setFieldValue('countryName', e?.name);
                    setCountryID(e?.id);
                  }}
                  inputValue={
                    loadedOptionsFor['countryId']
                      ? values.countryId
                      : placeholders.countryId
                  }
                  loadOptions={getOptions({
                    endPoint: ApiEndPoint.GetCountries,
                    key: 'countryId',
                    fieldsToShow: ['name'],
                    baseURLType: 'core',
                    params: { PageIndex: 1, PageSize: PAGINATION },
                    dataPickFromItems: true,
                  })}
                  onBlur={handleBlur}
                  errorMessage={
                    touched.countryId && errors.countryId
                      ? errors.countryId
                      : ''
                  }
                />
              </div>

              <div className="col-sm-12 col-md-6">
                <Field
                  type="options"
                  name={stateId.name}
                  label={stateId.label}
                  onChange={(e: {
                    value: string;
                    name: string;
                    id: number;
                  }) => {
                    setFieldValue('stateId', e?.value);
                    setFieldValue('stateName', e?.name);
                    setStateId(e?.id);
                  }}
                  cacheUniqs={[countryID]}
                  inputValue={
                    loadedOptionsFor['stateId']
                      ? values.stateId
                      : placeholders.stateId
                  }
                  loadOptions={
                    countryID
                      ? getOptions({
                          endPoint: `${ApiEndPoint.GetStates(
                            Number(countryID),
                          )}`,
                          key: 'stateId',
                          fieldsToShow: ['name'],
                          baseURLType: 'core',
                          params: { PageIndex: 1, PageSize: PAGINATION },
                          dataPickFromItems: true,
                        })
                      : () => ({ options: [], hasMore: false })
                  }
                  onBlur={handleBlur}
                  errorMessage={
                    touched.stateId && errors.stateId ? errors.stateId : ''
                  }
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="options"
                  name={cityId.name}
                  label={cityId.label}
                  onChange={(e: { value: string; name: string }) => {
                    setFieldValue('cityId', e?.value);
                    setFieldValue('cityName', e?.name);
                  }}
                  inputValue={
                    loadedOptionsFor['cityId']
                      ? values.cityId
                      : placeholders.cityId
                  }
                  cacheUniqs={[stateID]}
                  loadOptions={
                    stateID
                      ? getOptions({
                          endPoint: `${ApiEndPoint.GetCities(Number(stateID))}`,
                          key: 'cityId',
                          fieldsToShow: ['name'],
                          baseURLType: 'core',
                          params: { PageIndex: 1, PageSize: PAGINATION },
                          dataPickFromItems: true,
                        })
                      : () => ({ options: [], hasMore: false })
                  }
                  onBlur={handleBlur}
                  errorMessage={
                    touched.cityId && errors.cityId ? errors.cityId : ''
                  }
                />
              </div>
            </div>
          </>
        )}
      </ModalCustom>
      <AgGridGeneric
        rightActions={actionBtns}
        rowSelection={singleAddress ? 'single' : 'multiple'}
        rowData={addDeleteandEditFunctions(
          editValues?.addresses ?? [],
          handleDelete,
          handleEdit,
        )}
        // rowData={editValues?.addresses ?? []}
        columnDefs={
          simpleAddress
            ? columnDefsSimpleAddress
            : employ
            ? columnDefsEmploy
            : columnDefs
        }
        onRowSelected={onRowSelect}
      />
    </>
  );
};

export default AddressDetailsForm;
