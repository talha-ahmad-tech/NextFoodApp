import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    storeId,
    storeName,
    storeType,
    paymentMethod,
    todayFilterType,
    active,
    priceExclusiveTax,
    parkEnabled,
    discountExclusiveTax,
    storeLogo,
    showMenuImages,
    addresses,
    currencyId,
    numberSequence,
    floor,
    tax,
    currencyName,
    email,
    address,
    contactNumber,
    countryId,
    countryNameId,
    cityId,
    cityNameId,
    stateId,
    stateNameId,
    deliveryCharges,
    paymentMethodName,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    // [storeId.name]: Yup.string(),
    [deliveryCharges.name]: Yup.number().required(
      `${deliveryCharges.requiredErrorMsg}`,
    ),

    [storeName.name]: Yup.string().required(`${storeName.requiredErrorMsg}`),
    [storeType.name]: Yup.string().required(`${storeType.requiredErrorMsg}`),
    [paymentMethod.name]: Yup.array().required(
      `${paymentMethod.requiredErrorMsg}`,
    ),
    [todayFilterType.name]: Yup.string().required(
      `${todayFilterType.requiredErrorMsg}`,
    ),
    [active.name]: Yup.boolean(),
    [priceExclusiveTax.name]: Yup.boolean(),
    [parkEnabled.name]: Yup.boolean(),
    [discountExclusiveTax.name]: Yup.boolean(),
    // [storeLogo.name]: Yup.boolean(),
    [showMenuImages.name]: Yup.boolean(),
    // [currencyId.name]: Yup.string().required(`${currencyId.requiredErrorMsg}`),
    // [tax.name]: Yup.string().required(`${tax.requiredErrorMsg}`),
    [numberSequence.name]: Yup.string().required(
      `${numberSequence.requiredErrorMsg}`,
    ),
    // [floor.name]: Yup.string().required(`${floor.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [address.name]: Yup.string().required(`${address.requiredErrorMsg}`),
    [contactNumber.name]: Yup.string().required(
      `${contactNumber.requiredErrorMsg}`,
    ),
    [email.name]: Yup.string().required(`${email.requiredErrorMsg}`),
    [countryId.name]: Yup.string().required(`${countryId.requiredErrorMsg}`),
    [cityId.name]: Yup.string().required(`${cityId.requiredErrorMsg}`),
    [stateId.name]: Yup.string().required(`${stateId.requiredErrorMsg}`),
  }),
  // Yup.object().shape({}),
];

export const formInitialValues = {
  [storeId.name]: '',
  [storeName.name]: '',
  [storeType.name]: '',
  [paymentMethod.name]: '',
  [deliveryCharges.name]: '',
  [active.name]: false,
  [priceExclusiveTax.name]: false,
  [parkEnabled.name]: false,
  [discountExclusiveTax.name]: false,
  [storeLogo.name]: '',
  [showMenuImages.name]: false,
  [todayFilterType.name]: '',
  [addresses.name]: [],
  // [assignedProducts.name]: [],
  [currencyId.name]: '',
  [numberSequence.name]: '',
  [floor.name]: '',
  [tax.name]: '',
  [currencyName.name]: '',

  [address.name]: '',
  [email.name]: '',
  [contactNumber.name]: '',
  [countryId.name]: '',
  [cityId.name]: '',
  [stateId.name]: '',

  [countryNameId.name]: '',
  [cityNameId.name]: '',
  [stateNameId.name]: '',
  [paymentMethodName.name]: '',
};
