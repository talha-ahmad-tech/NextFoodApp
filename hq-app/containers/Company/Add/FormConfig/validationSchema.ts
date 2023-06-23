import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    companyName,
    currency,
    language,
    whiteLabelApp,
    timeZone,
    active,
    logo,
    legalCompanyName,
    legalVATNumber,
    contactName,
    contactNumber,
    email,
    password,
    confirmPassword,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [companyName.name]: Yup.string().required(
      `${companyName.requiredErrorMsg}`,
    ),
    [currency.name]: Yup.string(),
    [language.name]: Yup.string(),
    [whiteLabelApp.name]: Yup.boolean(),
    [timeZone.name]: Yup.string(),
    [active.name]: Yup.boolean(),
    [logo.name]: Yup.string(),
  }),
  Yup.object().shape({}),
  Yup.object().shape({
    [legalCompanyName.name]: Yup.string().required(
      `${legalCompanyName.requiredErrorMsg}`,
    ),
    [legalVATNumber.name]: Yup.string().required(
      `${legalVATNumber.requiredErrorMsg}`,
    ),
  }),
  Yup.object().shape({
    [contactName.name]: Yup.string().required(
      `${contactName.requiredErrorMsg}`,
    ),
    [contactNumber.name]: Yup.string().required(
      `${contactNumber.requiredErrorMsg}`,
    ),
    [email.name]: Yup.string().required(`${email.requiredErrorMsg}`),
    [password.name]: Yup.string().required(`${password.requiredErrorMsg}`),
    [confirmPassword.name]: Yup.string()
      .required(`${confirmPassword.requiredErrorMsg}`)
      .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
  }),
];

export const formInitialValues = {
  [companyName.name]: '',
  [currency.name]: '',
  [language.name]: '',
  [whiteLabelApp.name]: false,
  [timeZone.name]: '',
  [active.name]: false,
  [logo.name]: '',
  [legalCompanyName.name]: '',
  [legalVATNumber.name]: '',
  [contactName.name]: '',
  [contactNumber.name]: '',
  [email.name]: '',
  [password.name]: '',
  [confirmPassword.name]: '',
};
