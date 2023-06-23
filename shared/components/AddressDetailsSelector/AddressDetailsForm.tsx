import React, { useState } from 'react';
import { Field } from '@fridayfood/ui-toolkit';
import AgGridForm from '@fridayfood/shared/components/AgGridForm';
import ModalCustom from '@fridayfood/ui-toolkit/src/Modal';
import { columnDefs } from './utils';
import { FormikProps } from 'formik';
const AddressDetailsForm = ({
  formField,
  formData,
}: {
  formField: { [key: string]: any };
  formData: FormikProps<any>;
}) => {
  const [show, setShow] = useState(false);
  const [rowData, setRowData] = useState<any[]>([]);
  const { values, handleBlur, setFieldValue } = formData;
  const handleDelete = () => {
    setFieldValue('vendorInvoiceAddressId', '');
    setRowData([]);
  };
  const options = values?.vendorInvoiceAddresses?.map((item: any) => ({
    name: item.street,
    value: item.id,
  }));
  const handleSave = () => {
    setRowData(
      values?.vendorInvoiceAddresses?.filter(
        ({ id }: any) => id === values.vendorInvoiceAddressId,
      ),
    );
    setShow(false);
  };
  return (
    <>
      <ModalCustom
        saveButtonType={'button'}
        show={show}
        handleSave={handleSave}
        close={() => setShow(false)}
        title={'Add Address'}
      >
        <div className="row m-0" style={{ minHeight: '350px' }}>
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              name={'setlect'}
              label={'Address'}
              onChange={(e: any) =>
                setFieldValue('vendorInvoiceAddressId', e.value)
              }
              options={options}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </ModalCustom>

      <AgGridForm
        heading="Address & Contact"
        btnTitle="Add Address"
        isActionRequired
        onBtnClick={() => setShow(true)}
        rowData={rowData}
        columnDefs={columnDefs}
        cancelBtnTitle="Remove Address"
        onCancelBtnClick={handleDelete}
      />
    </>
  );
};

export default AddressDetailsForm;
