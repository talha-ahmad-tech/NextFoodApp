import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    name,
    code,
    type,
    amount,
    products,
    itemGroups,
    stores,
    customerLimit,
    maximumAmount,
    maximumLimit,
    startDate,
    endDate,
    isActive,
    tenantId,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [name.name]: Yup.string().required(),
    [code.name]: Yup.string().required(),
    [amount.name]: Yup.number().required(),
    [products.name]: Yup.array().required(),
    [startDate.name]: Yup.string().required(),
    [maximumLimit.name]: Yup.number().required(),
    [customerLimit.name]: Yup.number().required(),
    [maximumAmount.name]: Yup.number().required(),
    [itemGroups.name]: Yup.array().required(),
    [endDate.name]: Yup.string().required(),
    [stores.name]: Yup.array().required(),
    [type.name]: Yup.string().required(),
  }),
];

export const formInitialValues = {
  [name.name]: '',
  [code.name]: '',
  [type.name]: '',
  [amount.name]: 0,
  [products.name]: [],
  [itemGroups.name]: [],
  [name.name]: '',
  [customerLimit.name]: 0,
  [maximumAmount.name]: 0,
  [maximumLimit.name]: 0,
  [startDate.name]: '',
  [endDate.name]: '',
  [stores.name]: [],
  [isActive.name]: true,
  [tenantId.name]: 1,
};
