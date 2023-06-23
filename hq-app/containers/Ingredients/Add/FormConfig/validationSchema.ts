import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    productId,
    productType,
    productName,
    description,
    saleUom,
    purchaseUom,
    active,
    featuredProduct,
    enableDiscount,
    imageUrl,
    purchaseUomName,
    saleUomName,
    purchaseUomDetail,
    saleUomDetail,
    ingredientTaxes,
    cost,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [productId.name]: Yup.string().required(`${productId.requiredErrorMsg}`),
    [productName.name]: Yup.string().required(
      `${productName.requiredErrorMsg}`,
    ),
    [purchaseUom.name]: Yup.string().required(
      `${purchaseUom.requiredErrorMsg}`,
    ),
    [cost.name]: Yup.string().required(`${cost.requiredErrorMsg}`),

    [ingredientTaxes.name]: Yup.array().required(
      `${ingredientTaxes.requiredErrorMsg}`,
    ),
  }),
];

export const formInitialValues = {
  [productId.name]: '',
  [productName.name]: '',
  [description.name]: '',
  [productType.name]: 1,
  [description.name]: '',
  [purchaseUom.name]: '',
  [saleUom.name]: '',
  [active.name]: false,
  [featuredProduct.name]: false,
  [enableDiscount.name]: false,
  [imageUrl.name]: '',
  [purchaseUomName.name]: '',
  [saleUomName.name]: '',
  [purchaseUomDetail.name]: '',
  [saleUomDetail.name]: '',
  [ingredientTaxes.name]: '',
};
