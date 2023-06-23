import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    productId,
    productType,
    productName,
    description,
    categoryId,
    categoryDetail,
    itemGroupId,
    itemGroupDetail,
    saleUom,
    saleUomDetail,
    purchaseUom,
    purchaseUomDetail,
    cost,
    inStorePrice,
    deliveryPrice,
    collectionPrice,
    position,
    modifiers,
    modifiersDetail,
    tax,
    taxDetail,
    preparationTime,
    active,
    featuredProduct,
    enableDiscount,
    imageUrl,
    recipeType,
    recipesName,
    recipesCostCollection,
    recipesEatInCost,
    recipesDeliveryCost,
    purchaseUomName,
    saleUomName,
    productModifiers,
    modifiersTitle,
    items,
    categoryName,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [productId.name]: Yup.string().required(`${productId.requiredErrorMsg}`),
    [productName.name]: Yup.string().required(
      `${productName.requiredErrorMsg}`,
    ),
    // [description.name]: Yup.string().required(
    //   `${description.requiredErrorMsg}`,
    // ),
    [preparationTime.name]: Yup.string().required(
      `${preparationTime.requiredErrorMsg}`,
    ),
    [categoryId.name]: Yup.string().required(`${categoryId.requiredErrorMsg}`),
    [itemGroupId.name]: Yup.string().required(
      `${itemGroupId.requiredErrorMsg}`,
    ),
    // [productType.name]: Yup.string().required(
    //   `${productType.requiredErrorMsg}`,
    // ),
    // [purchaseUom.name]: Yup.string().required(
    //   `${purchaseUom.requiredErrorMsg}`,
    // ),
    [saleUom.name]: Yup.string().required(`${saleUom.requiredErrorMsg}`),
    [inStorePrice.name]: Yup.string().required(
      `${inStorePrice.requiredErrorMsg}`,
    ),
    // [cost.name]: Yup.string().required(`${cost.requiredErrorMsg}`),
    [deliveryPrice.name]: Yup.string().required(
      `${deliveryPrice.requiredErrorMsg}`,
    ),
    [collectionPrice.name]: Yup.string().required(
      `${collectionPrice.requiredErrorMsg}`,
    ),
    [position.name]: Yup.string().required(`${position.requiredErrorMsg}`),
    [active.name]: Yup.string().required(`${active.requiredErrorMsg}`),

    ///////////////
    // [modifiers.name]: Yup.string().required(`${modifiers.requiredErrorMsg}`),
    // [featuredProduct.name]: Yup.string().required(
    //   `${featuredProduct.requiredErrorMsg}`,
    // ),
    // [enableDiscount.name]: Yup.string().required(
    //   `${enableDiscount.requiredErrorMsg}`,
    // ),
    // [imageUrl.name]: Yup.string().required(`${imageUrl.requiredErrorMsg}`),
    // [tax.name]: Yup.string().required(
    //   `${tax.requiredErrorMsg}`,
    // ),
  }),

  Yup.object().shape({}),
];

export const formInitialValues = {
  [productId.name]: 'Product Id',
  [productName.name]: '',
  [description.name]: '',
  [categoryId.name]: '',
  [categoryDetail.name]: '',
  [productType.name]: 1,
  [description.name]: '',
  [preparationTime.name]: '',
  [itemGroupId.name]: '',
  [itemGroupDetail.name]: '',
  [purchaseUom.name]: '',
  [purchaseUomDetail.name]: '',
  [saleUom.name]: '',
  [saleUomDetail.name]: '',
  [inStorePrice.name]: '',
  [cost.name]: '',
  [deliveryPrice.name]: '',
  [collectionPrice.name]: '',
  [position.name]: '',
  [modifiers.name]: '',
  [modifiersDetail.name]: '',
  [tax.name]: '',
  [taxDetail.name]: '',
  [active.name]: false,
  [featuredProduct.name]: false,
  [enableDiscount.name]: false,
  [imageUrl.name]: '',
  [recipesName.name]: '',
  [recipesCostCollection.name]: '',
  [recipesEatInCost.name]: '',
  [recipesDeliveryCost.name]: '',
  [recipeType.name]: '',
  [modifiersTitle.name]: 'Add Modifiers',
  [purchaseUomName.name]: '',
  [saleUomName.name]: '',
  [productModifiers.name]: '',
  [items.name]: '',
  [categoryName.name]: '',
};
