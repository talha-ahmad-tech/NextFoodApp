import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    Module,
    min,
    form,
    max,
    type,
    isOverwrite,
    category,
    continuous,
    prefix,
    suffix,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [Module.name]: Yup.string().required(`${Module.requiredErrorMsg}`),
    // [min.name]: Yup.string(),
    [form.name]: Yup.string().required(`${form.requiredErrorMsg}`),
    [max.name]: Yup.string().required(`${max.requiredErrorMsg}`),
    // [isOverwrite.name]: Yup.string().required(
    //   `${isOverwrite.requiredErrorMsg}`,
    // ),
    [continuous.name]: Yup.string().required(`${continuous.requiredErrorMsg}`),
    [prefix.name]: Yup.string().required(`${prefix.requiredErrorMsg}`),
    [suffix.name]: Yup.string().required(`${suffix.requiredErrorMsg}`),
  }),
];

export const formInitialValues = {
  [Module.name]: '',
  [min.name]: '',
  [form.name]: '',
  [max.name]: '',
  [isOverwrite.name]: '',
  [prefix.name]: '',
  [suffix.name]: '',
  [type.name]: '',
  [category.name]: '',
  [continuous.name]: '',
};
