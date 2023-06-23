import * as Yup from 'yup';
import { FormFormModel } from './formModel';

const {
  formField: {
    itemGroupId,
    itemGroup,
    itemGroupIdName,
    description,
    position,
    active,
    featured,
    defaultImage,
    uploadImage,
    hideOnline,
    hideOnPos,
    name,
  },
} = FormFormModel;

export const validationSchema = [
  Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [description.name]: Yup.string(),
    [position.name]: Yup.string().required(`${position.requiredErrorMsg}`),
  }),
];

export const formInitialValues = {
  [itemGroupId.name]: '',
  [itemGroupIdName.name]: '',
  [name.name]: '',
  [description.name]: '',
  [position.name]: '',
  [active.name]: false,
  [featured.name]: false,
  [uploadImage.name]: '',
  [defaultImage.name]: '',
  [hideOnline.name]: false,
  [hideOnPos.name]: false,
  [itemGroup.name]: '',
};
