import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: { name, description },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [description.name]: Yup.string(),
  }),
];

export const formInitialValues = {
  [name.name]: '',
  [description.name]: '',
};
