import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    code,
    name,
    description,
    contactNumber,
    email,
    taxId,
    store,
    addresses,
    storeIdName,
    taxIdName,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    // [code.name]: Yup.string().required(`${code.requiredErrorMsg}`),
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [description.name]: Yup.string().required(
      `${description.requiredErrorMsg}`,
    ),
    [contactNumber.name]: Yup.string().required(
      `${contactNumber.requiredErrorMsg}`,
    ),
    [email.name]: Yup.string().required(`${email.requiredErrorMsg}`),
    // [taxId.name]: Yup.string().required(`${taxId.requiredErrorMsg}`),
    // [store.name]: Yup.string().required(`${store.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [addresses.name]: Yup.array().required(`${addresses.requiredErrorMsg}`),
  }),
];

export const formInitialValues = {
  [code.name]: '',
  [name.name]: '',
  [description.name]: '',
  [contactNumber.name]: '',
  [email.name]: '',
  [taxId.name]: '',
  [store.name]: '',
  [storeIdName.name]: '',
  [taxIdName.name]: '',
  [addresses.name]: [],
};
