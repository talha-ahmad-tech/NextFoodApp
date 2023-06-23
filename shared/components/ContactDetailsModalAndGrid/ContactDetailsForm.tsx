import { useState, useEffect, useRef } from 'react';
import { Field } from '@fridayfood/ui-toolkit';
import ModalCustom from '@fridayfood/ui-toolkit/src/Modal';
import Card from '@fridayfood/ui-toolkit/src/Card/CardWithLabel';
import { addDeleteandEditFunctions, columnDefs } from './Helper';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';

const ContactDetailsForm = ({
  contactDetail,
  setFieldValue,
  fieldToSet,
}: {
  contactDetail: [any];
  setFieldValue: Function;
  fieldToSet: any;
}) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  const [contactDetails, setContactDetails]: any = useState({
    contactNumber: '',
    defaultContact: false,
    defaultContactValue: 'No',
  });

  const handleSave = () => {
    if (contactDetails?.contactNumber) {
      let newContactDetails = [...contactDetail];

      if (editingIndex >= 0) {
        newContactDetails[editingIndex] = { ...contactDetails };
      } else {
        newContactDetails?.push({
          ...contactDetails,
        });
      }
      setFieldValue(fieldToSet, newContactDetails);
      setContactDetails({
        contactNumber: '',
        defaultContact: false,
        defaultContactValue: 'No',
      });
      setShow(false);
      setError('');
      setEditingIndex(-1);
    } else {
      setError('Please Enter Number to Add');
    }
  };
  const onCellValueChanged = (params: any) => {
    let index = params.rowIndex;
    let colId = params.column.colDef.field;
    let newcontactDetail = [...contactDetail];
    newcontactDetail[index][colId] = params.data[colId];
    setFieldValue(fieldToSet, newcontactDetail);
  };
  const onChangeValue = (event: any) => {
    if (event.target.id === 'defaultContact') {
      setContactDetails({
        ...contactDetails,
        defaultContact: event.target.checked,
        defaultContactValue: event.target.checked ? 'Yes' : 'No',
      });
    } else {
      setContactDetails({
        ...contactDetails,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleDelete = (index: number) => {
    let newContactValues: any = [];
    contactDetail.map(
      (item: any, i: number) => i !== index && newContactValues.push(item),
    );
    setFieldValue(fieldToSet, newContactValues);
  };
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setContactDetails({
      ...contactDetail[index],
    });
    setShow(true);
  };
  const ref: any = useRef(null);

  return (
    <Card
      ref={ref}
      Headertitle=""
      headerButtonShow={true}
      headerButtonLabel={'Add New Contact'}
      onClickHeaderButton={() => {
        setShow(true);
      }}
    >
      <ModalCustom
        saveButtonType={'button'}
        show={show}
        handleSave={handleSave}
        close={() => setShow(false)}
        title={'Contact Details'}
      >
        <div className="row m-0">
          <div className="col-sm-12 col-md-6">
            <Field
              name={'contactNumber'}
              label={'Contact Number'}
              value={contactDetails?.contactNumber}
              onChange={onChangeValue}
              errorMessage={error}
              isError={Boolean(error)}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="switch"
              checked={contactDetails?.defaultContact}
              name={'defaultContact'}
              label={'Is this your default Contact Number'}
              onChange={onChangeValue}
              errorMessage={''}
            />
          </div>
        </div>
      </ModalCustom>
      <AgGridReact
        rowData={addDeleteandEditFunctions(
          contactDetail,
          handleDelete,
          handleEdit,
        )}
        columnDefs={columnDefs}
        defaultColDef={{
          filter: true,
          floatingFilter: true,
          sortable: true,
        }}
        domLayout="autoHeight"
        onCellValueChanged={onCellValueChanged}
      />
    </Card>
  );
};

export default ContactDetailsForm;
