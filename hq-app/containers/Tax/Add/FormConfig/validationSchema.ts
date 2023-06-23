import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    taxId,
    name,
    description,
    taxRate,
    taxType,
    taxStores,
    clusters,
    taxItemGroups,
    taxProducts,
    clustersId,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    // [taxId.name]: Yup.string().required(`${taxId.requiredErrorMsg}`),
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [description.name]: Yup.string(),
    [taxRate.name]: Yup.string().required(`${taxRate.requiredErrorMsg}`),
    [taxType.name]: Yup.string().required(`${taxType.requiredErrorMsg}`),
    // [taxStores.name]: Yup.array().required(`${taxStores.requiredErrorMsg}`),
    [clusters.name]: Yup.string().required(`${clusters.requiredErrorMsg}`),
  }),
];

export const formInitialValues = {
  [taxId.name]: '',
  [name.name]: '',
  [description.name]: '',
  [taxRate.name]: '',
  [taxType.name]: '',
  [taxStores.name]: [],
  [clusters.name]: '',
  [taxItemGroups.name]: [],
  [taxProducts.name]: [],
  [clustersId.name]: '',
};
