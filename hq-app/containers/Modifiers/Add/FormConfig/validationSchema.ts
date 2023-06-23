import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    name,
    description,
    position,
    compulsory,
    maxSelectionAllowed,
    modifierValues,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [description.name]: Yup.string(),
    [position.name]: Yup.string().required(`${position.requiredErrorMsg}`),
    // [compulsory.name]: Yup.string().required(`${compulsory.requiredErrorMsg}`),
    // [optional.name]: Yup.string().required(`${optional.requiredErrorMsg}`),
    [maxSelectionAllowed.name]: Yup.string().required(
      `${maxSelectionAllowed.requiredErrorMsg}`,
    ),
  }),
];

export const formInitialValues = {
  [name.name]: '',
  [description.name]: '',
  [position.name]: '',
  [compulsory.name]: false,
  [maxSelectionAllowed.name]: '',
  [modifierValues.name]: [],
};
