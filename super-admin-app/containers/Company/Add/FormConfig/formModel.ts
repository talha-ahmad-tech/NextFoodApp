export const FormFormModel = {
  formId: 'companyManagement',
  formField: {
    name: {
      name: 'name',
      label: 'Company Name',
      requiredErrorMsg: 'Name is required',
    },
    currencyName: {
      name: 'currencyName',
      label: 'Currency',
      requiredErrorMsg: 'Currency is required',
    },
    currencyId: {
      name: 'currencyId',
      label: 'Currency',
      requiredErrorMsg: 'Currency is required',
    },
    language: {
      name: 'language',
      label: 'Language',
      requiredErrorMsg: 'Language is required',
      options: [
        { name: 'English UK', id: 1, value: 1 },
        { name: 'English USA', id: 2, value: 2 },
      ],
    },
    languageName: {
      name: 'languageName',
    },
    wlaApp: {
      name: 'wlaApp',
      label: 'White Label App',
      requiredErrorMsg: 'White Label App is required',
    },
    timeZoneId: {
      name: 'timeZoneId',
      label: 'Time Zone',
      requiredErrorMsg: 'Time Zone is required',
    },
    timeZone: {
      name: 'timeZone',
    },
    isActive: {
      name: 'isActive',
      label: 'Active',
      requiredErrorMsg: 'Active is required',
    },
    logo: {
      name: 'logo',
      label: 'Logo',
      requiredErrorMsg: 'Logo is required',
    },
    legalName: {
      name: 'legalName',
      label: 'Company Name',
      requiredErrorMsg: 'Name is required',
    },
    vat: {
      name: 'vat',
      label: 'VAT Registration Number',
      requiredErrorMsg: 'VAT Number is required',
    },
    contactName: {
      name: 'contactName',
      label: 'Name',
      requiredErrorMsg: 'Name is required',
    },
    contactNumber: {
      name: 'contactNumber',
      label: 'Contact Number',
      requiredErrorMsg: 'Contact Number is required',
    },
    adminEmailAddress: {
      name: 'adminEmailAddress',
      label: 'Email',
      requiredErrorMsg: 'Email is required',
    },
    adminPassword: {
      name: 'adminPassword',
      label: 'Password',
      requiredErrorMsg: 'Password is required',
    },
    confirmPassword: {
      name: 'confirmPassword',
      label: 'Confirm Password',
      requiredErrorMsg: 'confirmPassword is required',
    },

    address: {
      name: 'addresses',
      label: 'Address',
      requiredErrorMsg: 'address is required',
    },
    subDomain: {
      name: 'subDomain',
      label: 'subdomain Name',
      requiredErrorMsg: 'address is required',
    },
  },
};
