import * as Yup from 'yup';
import { AddressFormModel } from './formModel';

const {
  formField: { countryId, stateId, cityId, contactNumber, email, address },
}: typeof AddressFormModel = AddressFormModel;

export const validationSchema = Yup.object().shape({
  [countryId.name]: Yup.string().required(`${countryId.requiredErrorMsg}`),
  [stateId.name]: Yup.string().required(`${stateId.requiredErrorMsg}`),
  [cityId.name]: Yup.string().required(`${cityId.requiredErrorMsg}`),
  [address.name]: Yup.string().required(`${address.requiredErrorMsg}`),
  // [email.name]: Yup.string().required(`${email.requiredErrorMsg}`),
  // [contactNumber.name]: Yup.string().required(
  //   `${contactNumber.requiredErrorMsg}`,
  // ),
});
export const validationSchemaSimpleAddress = Yup.object().shape({
  [countryId.name]: Yup.string().required(`${countryId.requiredErrorMsg}`),
  [stateId.name]: Yup.string().required(`${stateId.requiredErrorMsg}`),
  [cityId.name]: Yup.string().required(`${cityId.requiredErrorMsg}`),
  [address.name]: Yup.string().required(`${address.requiredErrorMsg}`),
});
export const formInitialValues = {
  [countryId.name]: '',
  [stateId.name]: '',
  [cityId.name]: '',
  [email.name]: '',
  [contactNumber.name]: '',
  [address.name]: '',
};
