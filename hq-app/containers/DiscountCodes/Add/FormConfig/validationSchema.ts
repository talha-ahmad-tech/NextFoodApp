import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    orderSource,
    discountCategory,
    category,
    products,
    itemGroups,
    stores,
    customerLimit,
    maximumAmount,
    maximumLimit,
    startDate,
    endDate,
    startTime,
    endTime,
    isActive,
    tenantId,
    discountName,
    discountCode,
    voucherLimit,
    region,
    cluster,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [orderSource.name]: Yup.string().required(),
    [discountCategory.name]: Yup.string().required(),
    [category.name]: Yup.string().required(),
    [products.name]: Yup.array().required(),
    [startDate.name]: Yup.string().required(),
    [discountName.name]: Yup.string().required(),
    [maximumLimit.name]: Yup.string().required(),
    [customerLimit.name]: Yup.string().required(),
    [voucherLimit.name]: Yup.string().required(),
    [maximumAmount.name]: Yup.string().required(),
    [itemGroups.name]: Yup.array().required(),
    [endDate.name]: Yup.string().required(),
    [endTime.name]: Yup.string().required(),
    [startTime.name]: Yup.string().required(),
    [discountCode.name]: Yup.string().required(),
    [stores.name]: Yup.array().required(),
    [region.name]: Yup.string().required(),
    [cluster.name]: Yup.array().required(),
  }),
];

export const formInitialValues = {
  [orderSource.name]: '',
  [discountCategory.name]: '',
  [category.name]: '',
  [products.name]: [],
  [itemGroups.name]: [],
  [customerLimit.name]: '',
  [maximumAmount.name]: '',
  [maximumLimit.name]: '',
  [startDate.name]: '',
  [endDate.name]: '',
  [stores.name]: [],
  [isActive.name]: true,
  [tenantId.name]: 1,
  [discountName.name]: '',
  [discountCode.name]: '',
  [voucherLimit.name]: '',
  [endTime.name]: '',
  [startTime.name]: '',

  [cluster.name]: '',
  [region.name]: '',
};
