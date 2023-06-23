export const columnDefs = [
  {
    headerName: "Description",
    field: "description",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: false,
    width: 200,
    headerCheckboxSelection: true,
    checkboxSelection: true,
  },
  {
    headerName: "Country",
    field: "countryName",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: false,
    width: 200,
  },
  {
    headerName: "State",
    field: "stateName",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: false,
    width: 200,
  },
  {
    headerName: "City",
    field: "cityName",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: false,
    width: 200,
  },
  {
    headerName: "Address",
    field: "street",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: false,
    width: 200,
  },
  {
    headerName: "Zip Code",
    field: "zipCode",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: false,
    width: 200,
  },
  {
    headerName: "Contact Number",
    field: "contactNumber",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: false,
    width: 200,
  },
  {
    headerName: "Contact Person",
    field: "contactPerson",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: false,
    width: 200,
  },
  {
    headerName: "Email ID",
    field: "email",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: false,
    width: 200,
  },
  {
    headerName: "URL",
    field: "url",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: false,
    width: 200,
  },

  {
    headerName: "Purpose",
    field: "purpose",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: false,
    width: 200,
    cellRenderer: ({ data }: any) => {
      const purpose = data?.purpose === "Delivery" ? "Delivery" : "Invoicing";
      return purpose;
    },
  },
  {
    headerName: "Address Type",
    field: "addressType",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: false,
    width: 200,
    cellRenderer: ({ data }: any) => {
      const addressType =
        data?.addressType === "Delivery" ? "Delivery" : "Invoicing";
      return addressType;
    },
  },
];

export const addDeleteandEditFunctions = (
  values: any,
  handleDelete: any,
  handleEdit: any
) =>
  values.length === 0
    ? []
    : values?.map((value: any, index: number) => ({
        ...value,
        deleteFunction: () => handleDelete(index),
        editFunction: () => handleEdit(index),
      }));
