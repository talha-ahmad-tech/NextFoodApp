export const AddressFormModel = {
  formId: 'addressDetail',
  formField: {
    contactNumber: {
      name: 'contactNumber',
      label: 'Number',
      requiredErrorMsg: 'Contact number is required',
    },

    countryId: {
      name: 'countryId',
      label: 'Country',
      requiredErrorMsg: 'countryName is required',
    },
    email: {
      name: 'email',
      label: 'Email',
      requiredErrorMsg: 'Email is required',
    },

    stateId: {
      name: 'stateId',
      label: 'State / Province',
      requiredErrorMsg: 'State is required',
    },

    cityId: {
      name: 'cityId',
      label: 'City',
      requiredErrorMsg: 'City is required',
    },

    address: {
      name: 'address',
      label: 'Address',
      requiredErrorMsg: 'Address is required',
    },
  },
};
