import AgGridGeneric from "../AgGridForm/AgGridGeneric";

const LinesModalSingle = ({
  onClickAdd,
  onCellValueChanged,
  columnDefs,
  onSelectionChanged,
  rowData,
  onClickSave,
  hideSave,
  headerOne,
  headerTwo,
}: any) => {
  interface params {
    onClickAdd: Function;
    onCellValueChanged: Function;
    columnDefs: [];
    onSelectionChanged: Function;
    rowData: [];
    onClickSave: Function;
    hideSave?: any;
    header?: string;
  }
  const onGridReady = (params: params) => {};
  return (
    <div className="row m-0">
      <div className="">
        <div className={`  ${hideSave ? "m-0" : "m-0"}`}>
          <div className="custom-flex-between custom-height-header">
            <h5 className="font-medium">Add Selected Lines</h5>
          </div>
        </div>
        <AgGridGeneric
          rowData={rowData}
          columnDefs={columnDefs}
          onCellValueChanged={onCellValueChanged}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default LinesModalSingle;
