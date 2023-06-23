import { defDate } from '@/utils/helper';
import * as Yup from 'yup';
import { FormFormModel } from './formModel';

export const {
  formField: { priceType, name, description, status, dateFrom, dateTill },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [priceType.name]: Yup.string().required(`${priceType.requiredErrorMsg}`),
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [status.name]: Yup.string().required(`${status.requiredErrorMsg}`),
    [description.name]: Yup.string(),
    [dateFrom.name]: Yup.string().required(`${dateFrom.requiredErrorMsg}`),
    [dateTill.name]: Yup.string().required(`${dateTill.requiredErrorMsg}`),
  }),
];

export const formInitialValues = {
  [priceType.name]: '',
  [name.name]: '',
  [status.name]: '',
  [dateFrom.name]: new Date().toISOString().substring(0, 10),
  [dateTill.name]: new Date().toISOString().substring(0, 10),
};
