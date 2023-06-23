import * as Yup from 'yup';
import { FormFormModel } from './formModel';
import moment from 'moment';

const {
  formField: {
    name,
    description,
    date,
    time,
    reason,
    documentReference,
    supplierId,
    supplierName,
    storeId,
    store,
    storeName
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [description.name]: Yup.string().required(
      `${description.requiredErrorMsg}`,
    ),
    [date.name]: Yup.string().required(`${date.requiredErrorMsg}`),
    // [time.name]: Yup.string().required(`${time.requiredErrorMsg}`),
    [documentReference.name]: Yup.string().required(
      `${documentReference.requiredErrorMsg}`,
    ),
    [reason.name]: Yup.string().required(`${reason.requiredErrorMsg}`),
    // [supplierId.name]: Yup.string().required(`${supplierId.requiredErrorMsg}`),
    [storeId.name]: Yup.string().required(`${storeId.requiredErrorMsg}`),
  }),
];

export const formInitialValues = {
  [name.name]: '',
  [description.name]: '',
  [date.name]: new Date().toISOString().substring(0, 10),
  [time.name]: moment().format("HH:mm"),
  [reason.name]: '',
  [documentReference.name]: '',
  [supplierId.name]: null,
  [supplierName.name]: '',
  [store.name]: '',
  [storeId.name]: '',
  [storeName.name]: '',
  
};
