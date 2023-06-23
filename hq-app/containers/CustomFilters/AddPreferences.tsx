import React from 'react';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import ModalCustom from '@fridayfood/ui-toolkit/src//Modal';
import useUtils from './Filters/useUtils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormFormModel } from './FormConfig/formModel';

import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
const { formField } = FormFormModel;

const Preference = () => {
  const { filters, setFilters, saveFilters } = useUtils();
  const { preference } = formField;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formProps = useForm<any>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[0]),
    defaultValues: formInitialValues,
  });
  const {
    setValue,
    handleSubmit,
    // getValues,
    formState: { errors },
    watch,
    register,
    reset,
    clearErrors,
  } = formProps;

  const _handleSubmit = (props: { preference?: string }) => {
    const preference: string = props?.preference || '';
    saveFilters(preference, () => reset());
  };
  return (
    <div className="App">
      <form id="forCustomForm" onSubmit={handleSubmit(_handleSubmit)}>
        <ModalCustom
          show={filters?.open}
          title={'Add Custom Filter'}
          noAction
          close={() => setFilters({ ...filters, open: false })}
          modalWidth="custom-small-modal"
          noScroll
          customFooter
          footerEnd
        >
          {/* <MyField {...props} /> */}
          <div className="custom-modal-footer-center">
            <Field
              type="text"
              {...register('preference')}
              onChange={(e: { target: { value: string } }) => {
                setValue('preference', e.target.value);
                clearErrors(['preference']);
              }}
              customClass="full-width"
              isFullWidth={true}
              label={preference.label}
              value={watch('preference')}
              errorMessage={
                errors?.preference ? errors.preference?.message : ''
              }
            />
          </div>
          {/* <div className="custom-modal-footer-center col-sm-12 col-md-12">
            <Field
              type="text"
              {...register(description.name)}
              onChange={(e: { target: { value: string } }) => {
                setValue(description.name, e.target.value);
                clearErrors(['description']);
              }}
              label={description.label}
              value={watch(description.name)}
              errorMessage={
                errors?.description ? errors.description?.message : ''
              }
            />
          </div> */}
          <div className={'custom-modal-footer-end '}>
            <button
              className="custom-btn-secondary me-2"
              type="button"
              onClick={() => setFilters({ ...filters, open: false })}
            >
              No
            </button>
            <button
              className="custom-btn-primary"
              type="submit"
              form="forCustomForm"
            >
              Save
            </button>
          </div>
        </ModalCustom>
      </form>
    </div>
  );
};

export default Preference;
