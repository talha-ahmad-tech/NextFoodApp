import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    name,
    description,
    productCategory,
    productCategoryName,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [description.name]: Yup.string(),

    [productCategory.name]: Yup.string().required(
      `${productCategory.requiredErrorMsg}`,
    ),
  }),
];

export const formInitialValues = {
  [name.name]: '',
  [description.name]: '',
  [productCategory.name]: '',
  [productCategoryName.name]: '',
};
