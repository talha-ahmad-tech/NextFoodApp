import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: { preference, description },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [preference.name]: Yup.string().required(`${preference.requiredErrorMsg}`),
    // [description.name]: Yup.string().required(
    //   `${description.requiredErrorMsg}`,
    // ),
  }),

  Yup.object().shape({}),
];

export const formInitialValues = {
  [preference.name]: '',
  [description.name]: '',
};
