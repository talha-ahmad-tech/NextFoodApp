import { Loader } from '@fridayfood/ui-toolkit';
import AgGridGeneric from '../AgGridForm/AgGridGeneric';
interface ILines {
  onClickAdd?: any;
  onCellValueChanged?: any;
  columnDefsOne?: any;
  columnDefsTwo?: any;
  onSelectionChangedOne?: any;
  onSelectionChangedTwo?: any;
  rowDataFirst?: any;
  rowDataSecond?: any;
  onClickSave?: any;
  onClickCancel?: any;
  hideSave?: any;
  headerOne?: any;
  headerTwo?: any;
  productLoader?: boolean;
  varientLoader?: boolean;
  customTopButtons?: boolean;
  onRowSelected?: any;
}
const LinesModal = ({
  onClickAdd,
  onCellValueChanged,
  columnDefsOne,
  columnDefsTwo,
  onSelectionChangedOne,
  onSelectionChangedTwo,
  rowDataFirst,
  rowDataSecond,
  onClickSave,
  hideSave,
  headerOne,
  headerTwo,
  onClickCancel,
  productLoader = false,
  varientLoader = false,
  customTopButtons = false,
  onRowSelected,
}: ILines) => {
  interface params {
    onClickAdd?: Function;
    onCellValueChanged?: Function;
    columnDefsOne?: [];
    columnDefsTwo?: [];
    onSelectionChangedOne?: Function;
    onSelectionChangedTwo?: Function;
    rowDataFirst?: [];
    rowDataSecond?: [];
    onClickSave?: Function;
    onClickCancel?: Function;
    hideSave?: any;
    headerOne?: string;
    headerTwo?: string;
  }
  const onGridReady = (params: params) => {};
  return (
    <div className="row m-0">
      <div className="col">
        <div className="custom-flex-between custom-height-header">
          <h5 className="font-medium">Available Products</h5>

          {customTopButtons ? (
            <div className="custom-flex-start">
              <button
                className="custom-btn-secondary me-3 border-round"
                type="button"
                onClick={onClickCancel}
              >
                Cancel
              </button>
              <button
                className="custom-btn-primary border-round"
                type="button"
                onClick={onClickSave}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="customdropdownbutton custom-grey-outline-btn no-icon">
              <button onClick={onClickAdd} type="button">
                <svg
                  id="Group_3603"
                  data-name="Group 3603"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10.038"
                  height="9.681"
                  viewBox="0 0 10.038 9.681"
                >
                  <path
                    id="Path_64197"
                    data-name="Path 64197"
                    d="M1.46-8.018H5.533v3.9H7.415v-3.9H11.5V-9.9H7.415v-3.9H5.533v3.9H1.46Z"
                    transform="translate(-1.46 13.8)"
                    fill="#6883AB"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        {productLoader ? (
          <Loader />
        ) : (
          <AgGridGeneric
            rowData={rowDataFirst}
            columnDefs={columnDefsOne}
            onCellValueChanged={onCellValueChanged}
            rowSelection="multiple"
            onSelectionChanged={onSelectionChangedOne}
            onGridReady={onGridReady}
            onRowSelected={onRowSelected}
            // setAddGrnId(e.api.getSelectedRows());
          />
        )}
      </div>
      {Boolean(rowDataSecond) && (
        <div className="col">
          <div className={`  ${hideSave ? 'm-0' : 'm-0'}`}>
            <div className="custom-flex-between custom-height-header">
              <h5 className="font-medium">Add Selected Product</h5>
            </div>
          </div>
          {varientLoader ? (
            <Loader />
          ) : (
            <AgGridGeneric
              rowData={rowDataSecond}
              columnDefs={columnDefsTwo}
              onCellValueChanged={onCellValueChanged}
              rowSelection="multiple"
              onSelectionChanged={onSelectionChangedTwo}
              onGridReady={onGridReady}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default LinesModal;
