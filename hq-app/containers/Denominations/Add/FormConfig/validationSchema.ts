import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: { name, description, stores, position },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [description.name]: Yup.string(),
    [position.name]: Yup.string().required(`${position.requiredErrorMsg}`),
    // [stores.name]: Yup.array().required(`${stores.requiredErrorMsg}`),
  }),
];

export const formInitialValues = {
  [name.name]: '',
  [description.name]: '',
  [position.name]: '',
  [stores.name]: '',
};
