import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    employeeType,
    employeeId,
    employeeName,
    role,
    password,
    pinNumber,
    payType,
    payDetails,
    stores,
    active,
    number,
    email,
    addresses,
    roleIdName,
    storeIdName,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [employeeType.name]: Yup.string().required(
      `${employeeType.requiredErrorMsg}`,
    ),
    // [employeeId.name]: Yup.string(),
    [employeeName.name]: Yup.string().required(
      `${employeeName.requiredErrorMsg}`,
    ),
    // [role.name]: Yup.array(),
    // [password.name]: Yup.string()
    //   .required(`${password.requiredErrorMsg}`)
    //   .matches(
    //     /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
    //     'Password Must Contain One Uppercase, One Digit, One Special Case Character and atleast 6 characters long',
    //   ),

    [pinNumber.name]: Yup.string().required(`${pinNumber.requiredErrorMsg}`),
    [payType.name]: Yup.string().required(`${payType.requiredErrorMsg}`),
    [payDetails.name]: Yup.number().required(`${payDetails.requiredErrorMsg}`),
    // [stores.name]: Yup.array(),
    [number.name]: Yup.string().required(`${number.requiredErrorMsg}`),
    [email.name]: Yup.string().required(`${email.requiredErrorMsg}`),
    [active.name]: Yup.boolean(),
  }),
  Yup.object().shape({
    [addresses.name]: Yup.array().required(`${addresses.requiredErrorMsg}`),
  }),
];

export const formInitialValues = {
  [employeeType.name]: '',
  [employeeId.name]: '',
  [employeeName.name]: '',
  [role.name]: [''],
  [stores.name]: [],
  [password.name]: '',
  [pinNumber.name]: '',
  [payType.name]: '',
  [payDetails.name]: '',
  [active.name]: false,
  [number.name]: '',
  [email.name]: '',
  [addresses.name]: [],
  [roleIdName.name]: '',
  [storeIdName.name]: '',
};
