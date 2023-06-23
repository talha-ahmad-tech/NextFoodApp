import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: { code, name, description, position, orderSource },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    // [code.name]: Yup.string().required(
    //   `${code.requiredErrorMsg}`,
    // ),
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [description.name]: Yup.string(),
    [position.name]: Yup.string().required(`${position.requiredErrorMsg}`),
    [orderSource.name]: Yup.string().required(
      `${orderSource.requiredErrorMsg}`,
    ),
  }),
];

export const formInitialValues = {
  [code.name]: '',
  [name.name]: '',
  [description.name]: '',
  [position.name]: '',
  [orderSource.name]: '',
};
