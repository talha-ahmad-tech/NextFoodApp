import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    name,
    currencyName,
    currencyId,
    language,
    languageName,
    wlaApp,
    timeZoneId,
    timeZone,
    isActive,
    logo,
    legalName,
    vat,
    contactName,
    contactNumber,
    adminEmailAddress,
    adminPassword,
    confirmPassword,
    subDomain,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [currencyId.name]: Yup.string().required(`${currencyId.requiredErrorMsg}`),
    [language.name]: Yup.string().required(`${language.requiredErrorMsg}`),
    // [wlaApp.name]: Yup.boolean(),
    // [timeZoneId.name]: Yup.string().required(`${timeZoneId.requiredErrorMsg}`),
    // [isActive.name]: Yup.boolean(),
    // [logo.name]: Yup.string(),
  }),
  Yup.object().shape({}),
  Yup.object().shape({
    [legalName.name]: Yup.string().required(`${legalName.requiredErrorMsg}`),
    [vat.name]: Yup.string().required(`${vat.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [contactName.name]: Yup.string().required(
      `${contactName.requiredErrorMsg}`,
    ),
    [contactNumber.name]: Yup.string().required(
      `${contactNumber.requiredErrorMsg}`,
    ),
    [adminEmailAddress.name]: Yup.string().required(
      `${adminEmailAddress.requiredErrorMsg}`,
    ),
    [adminPassword.name]: Yup.string().required(
      `${adminPassword.requiredErrorMsg}`,
    ),
    [confirmPassword.name]: Yup.string()
      .required(`${confirmPassword.requiredErrorMsg}`)
      .oneOf([Yup.ref('adminPassword')], 'Your passwords do not match.'),
  }),
];

export const validationSchemaEdit = [
  Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [currencyId.name]: Yup.string().required(`${currencyId.requiredErrorMsg}`),
    [language.name]: Yup.string().required(`${language.requiredErrorMsg}`),
  }),
  Yup.object().shape({}),
  Yup.object().shape({
    [legalName.name]: Yup.string().required(`${legalName.requiredErrorMsg}`),
    [vat.name]: Yup.string().required(`${vat.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [contactName.name]: Yup.string().required(
      `${contactName.requiredErrorMsg}`,
    ),
    [contactNumber.name]: Yup.string().required(
      `${contactNumber.requiredErrorMsg}`,
    ),
  }),
];

export const formInitialValues = {
  [name.name]: '',
  [currencyName.name]: '',
  [currencyId.name]: '',
  [language.name]: '',
  [languageName.name]: '',
  [wlaApp.name]: false,
  [timeZoneId.name]: null,
  [timeZone.name]: '',

  [isActive.name]: false,
  [logo.name]: '',
  [legalName.name]: '',
  [vat.name]: '',
  [contactName.name]: '',
  [contactNumber.name]: '',
  [adminEmailAddress.name]: '',
  [adminPassword.name]: '',
  [confirmPassword.name]: '',
  [subDomain.name]: '',
};
