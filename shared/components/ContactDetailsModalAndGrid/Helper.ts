import EditDeleteIcons from "./EditDeleteIcons";

export const columnDefs = [
  {
    no: 1,
    headerName: "Line No",
    field: "",
    valueGetter: "node.rowIndex + 1",
    sortable: true,
    filter: "agTextColumnFilter",
    checkboxSelection: true,
    editable: false,
    width: 400,
    headerCheckboxSelection: true,
  },
  {
    no: 2,
    headerName: "Contact Number",
    field: "contactNumber",
    sortable: true,
    filter: "agTextColumnFilter",
    checkboxSelection: false,
    editable: false,
    width: 400,
    headerCheckboxSelection: true,
  },
  {
    no: 3,
    headerName: "Default Contact Number",
    field: "defaultContactValue",
    sortable: true,
    filter: "agTextColumnFilter",
    checkboxSelection: false,
    editable: false,
    width: 400,
    headerCheckboxSelection: true,
  },
  {
    no: 4,
    headerName: "Actions",
    field: "deleteFunction",
    sortable: true,
    filter: "agTextColumnFilter",
    checkboxSelection: false,
    editable: false,
    width: 400,
    headerCheckboxSelection: true,
    cellRenderer: EditDeleteIcons,
  },
];

export const addDeleteandEditFunctions = (
  values: any,
  handleDelete: any,
  handleEdit: any
) =>
  values?.length === 0
    ? []
    : values?.map((value: any, index: number) => ({
        ...value,
        deleteFunction: () => handleDelete(index),
        editFunction: () => handleEdit(index),
      }));
