import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: { uomName, description, classType, name },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [uomName.name]: Yup.string().required(`${uomName.requiredErrorMsg}`),
    [description.name]: Yup.string(),
    // [classType.name]: Yup.string().required(`${classType.requiredErrorMsg}`),
  }),
];

export const formInitialValues = {
  [uomName.name]: '',
  [name.name]: '',
  [description.name]: '',
  [classType.name]: '',
};
