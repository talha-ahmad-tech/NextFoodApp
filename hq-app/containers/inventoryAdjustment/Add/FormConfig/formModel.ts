export const FormFormModel = {
  formId: 'inventoryAdjustmentNew',
  formField: {
    name: {
      name: 'name',
      label: 'Name',
      requiredErrorMsg: 'Name is Required',
    },
    description: {
      name: 'description',
      label: 'Description',
      requiredErrorMsg: 'Description is required',
    },
    date: {
      name: 'date',
      label: 'Date',
      requiredErrorMsg: 'Date is required',
    },
    time: {
      name: 'time',
      label: 'Time',
      requiredErrorMsg: 'Time is required',
    },
    reason: {
      name: 'reason',
      label: 'Reason',
      reasonOptions: [
        { name: 'Purchase', value: 0 },
        { name: 'StockIn', value: 1 },
        { name: 'StockOut', value: 2 },
        { name: 'Wastage', value: 3 },
        { name: 'Damage', value: 4 },
        { name: 'Adjustment', value: 5 },
      ],
      requiredErrorMsg: 'Reason is required',
    },
    documentReference: {
      name: 'documentReference',
      label: 'Document Reference',
      requiredErrorMsg: 'Document Reference is required',
    },
    supplierId: {
      name: 'supplierId',
      label: 'Supplier',
      requiredErrorMsg: 'Supplier is required',
    },
    supplierName: {
      name: 'supplierName',
      label: 'Supplier',
      requiredErrorMsg: 'Supplier Name is required',
    },
    storeId: {
      name: 'storeId',
      label: 'Store',
      requiredErrorMsg: 'Store is required',
    },


    storeName: {
      name: 'storeName',
      label: 'Store',
      requiredErrorMsg: 'Store is required',
    },

    store: {
      name: 'store',
      label: 'Store',
    },
  },
};
