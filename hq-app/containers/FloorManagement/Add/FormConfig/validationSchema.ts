import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    name,
    width,
    noOfSeats,
    noOfTables,
    height,
    vacant,
    serving,
    reserved,
    floorArea,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [floorArea.name]: Yup.string(),
    [noOfTables.name]: Yup.string(),
    [noOfSeats.name]: Yup.string(),
    [height.name]: Yup.string(),
    [width.name]: Yup.string(),

    // [stores.name]: Yup.string().required(`${stores.requiredErrorMsg}`),
  }),
];

export const formInitialValues = {
  [name.name]: '',
  [floorArea.name]: '',
  [noOfTables.name]: '',
  [noOfSeats.name]: '',
  [width.name]: '',
  [height.name]: '',
  [vacant.name]: '#994d00',
  [serving.name]: '#ff471a',
  [reserved.name]: '#0059b3',

};
