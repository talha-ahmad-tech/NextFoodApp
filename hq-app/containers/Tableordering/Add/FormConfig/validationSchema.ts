import * as Yup from "yup";
import { FormFormModel } from "./formModel";

const {
  formField: {
    allowTableOrder,
    noOfTable,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [allowTableOrder.name]: Yup.string().required(`${allowTableOrder}`),
    [noOfTable.name]: Yup.string().required(`${ noOfTable}`),
  }),
];

export const formInitialValues = {
  [allowTableOrder.name]: false,
  [noOfTable.name]: "",
};
