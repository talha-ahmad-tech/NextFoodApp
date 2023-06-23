import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: { name, isDefault, isPublic },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [isPublic.name]: Yup.boolean(),
    [isDefault.name]: Yup.boolean(),
  }),
];

export const formInitialValues = {
  [name.name]: '',
  [isDefault.name]: false,
  [isPublic.name]: false,
};
