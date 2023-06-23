export const FormFormModel = {
  formId: "foodCosting",
  formField: {
    code: {
      name: "code",
      label: "Sequence Number",
      requiredErrorMsg: "Sequence Number is required",
    },
    foodCostingName: {
      name: "foodCostingName",
      label: "Name",
      requiredErrorMsg: "Name is required",
    },
    itemGroupId: {
      name: "itemGroupId",
      label: "Select Item Group",
      requiredErrorMsg: "Item Group is required",
    },
    activeFrom: {
      name: "activeFrom",
      label: "Active From",
      requiredErrorMsg: "Active From is required",
    },
    activeTo: {
      name: "activeTo",
      label: "Active To",
      requiredErrorMsg: "Active To is required",
    },
    standardCost: {
      name: "standardCost",
      label: "Standard Cost",
      requiredErrorMsg: "Standard Cost is required",
    },
    totalRetailPrice: {
      name: "totalRetailPrice",
      label: "Retail Price",
      requiredErrorMsg: "Retail Price is required",
    },
    purchaseTaxGroupId: {
      name: "purchaseTaxGroupId",
      label: "Purchase Tax Group",
      requiredErrorMsg: "Purchase Tax Group is required",
    },
    saleTaxGroupId: {
      name: "saleTaxGroupId",
      label: "Sale Tax Group",
      requiredErrorMsg: "Sale Tax Group is required",
    },
    foodCostingDetails: {
      name: "foodCostingDetails",
      requiredErrorMsg: "foodCosting Details/Lines are required",
    },
  },
};
