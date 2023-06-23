import * as Yup from "yup";
import { FormFormModel } from "./formModel";

const {
  formField: {
    code,
    foodCostingName,
    itemGroupId,
    activeFrom,
    activeTo,
    standardCost,
    totalRetailPrice,
    purchaseTaxGroupId,
    saleTaxGroupId,
    foodCostingDetails,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [code.name]: Yup.string().required(`${code.requiredErrorMsg}`),
    [foodCostingName.name]: Yup.string().required(`${ foodCostingName.requiredErrorMsg}`),
    [itemGroupId.name]: Yup.string().required(
      `${itemGroupId.requiredErrorMsg}`
    ),
    [activeFrom.name]: Yup.string().required(`${activeFrom.requiredErrorMsg}`),
    [standardCost.name]: Yup.string().required(
      `${standardCost.requiredErrorMsg}`
    ),
    [totalRetailPrice.name]: Yup.string().required(
      `${totalRetailPrice.requiredErrorMsg}`
    ),
    [purchaseTaxGroupId.name]: Yup.string().required(
      `${purchaseTaxGroupId.requiredErrorMsg}`
    ),
    [saleTaxGroupId.name]: Yup.string().required(
      `${saleTaxGroupId.requiredErrorMsg}`
    ),
  }),
  Yup.object().shape({
    [foodCostingDetails.name]: Yup.array()
      .min(1)
      .required(`${ foodCostingDetails.requiredErrorMsg}`),
  }),
];

export const formInitialValues = {
  [code.name]: "",
  [foodCostingName.name]: "",
  [itemGroupId.name]: "",
  [activeFrom.name]: "",
  [activeTo.name]: "",
  [standardCost.name]: "",
  [totalRetailPrice.name]: "",
  [purchaseTaxGroupId.name]: "",
  [saleTaxGroupId.name]: "",
  [foodCostingDetails.name]: [],
};
