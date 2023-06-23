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
    uploadImage,

    //deals
    startTime,
    endTime,
    dealInStorePrice,
    dealDeliveryPrice,
    dealCollectionPrice,
    showInsightsBy,
    quantitySold,
    modifiersTitle,
    taxDefaults,
    purchaseUomName,
    saleUomName,
    imageUrl,
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
    [preparationTime.name]: Yup.string().required(
      `${preparationTime.requiredErrorMsg}`,
    ),
    [categoryId.name]: Yup.string().required(`${categoryId.requiredErrorMsg}`),
    [itemGroupId.name]: Yup.string().required(
      `${itemGroupId.requiredErrorMsg}`,
    ),
    [saleUom.name]: Yup.string().required(`${saleUom.requiredErrorMsg}`),
    [inStorePrice.name]: Yup.string().required(
      `${inStorePrice.requiredErrorMsg}`,
    ),
    [deliveryPrice.name]: Yup.string().required(
      `${deliveryPrice.requiredErrorMsg}`,
    ),
    [collectionPrice.name]: Yup.string().required(
      `${collectionPrice.requiredErrorMsg}`,
    ),
    [position.name]: Yup.string().required(`${position.requiredErrorMsg}`),
  }),

  Yup.object().shape({
    [startTime.name]: Yup.string().required(`${startTime.requiredErrorMsg}`),
    [endTime.name]: Yup.string().required(`${endTime.requiredErrorMsg}`),
  }),
];

export const formInitialValues = {
  [productId.name]: '',
  [productName.name]: '',
  [description.name]: '',
  [categoryId.name]: '',
  [categoryDetail.name]: '',
  [productType.name]: 2,
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
  [taxDetail.name]: [],
  [active.name]: false,
  [featuredProduct.name]: false,
  [enableDiscount.name]: false,
  [uploadImage.name]: '',

  [startTime.name]: '',
  [dealInStorePrice.name]: '',
  [dealCollectionPrice.name]: '',
  [dealDeliveryPrice.name]: '',
  [showInsightsBy.name]: '',

  [quantitySold.name]: '',
  [modifiersTitle.name]: 'Add Modifiers',
  [taxDefaults.name]: '',
  [purchaseUomName.name]: '',
  [saleUomName.name]: '',
  [imageUrl.name]: '',
  [items.name]: '',
  [categoryName.name]: '',
};
