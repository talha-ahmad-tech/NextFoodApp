import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import SectionWrapper from '../SectionWrapper';
import CustomDropdown from '../CustomDropdown';
import GridAction, { IGridAction } from './GridActions';
import ToggleButton from '../ToggleButton';
import ImportExportFiles from '../ImportExportFiles';
import { useContext } from 'react';
import { GridContext } from '../Context/ImportExportContext';

interface AgGridCustomPropTypes {
  columnDefs: { field: string; type?: undefined | string }[];
  defaultColDef?: ColDef;
  actionButtons?: IGridAction | any;
  onGridReady: (params: GridReadyEvent) => void;
  onRowSelect?: (params: any) => void;
  btnTitle?: string;
  onBtnClick?: any;
  cancelBtnTitle?: string;
  onCancelBtnClick?: any;
  paginationPageSize?: number;
  detailCellRendererParams?: any;
  masterDetail?: boolean;
  rowData?: any;
  onRowSelected?: any;
  pinnedTopRowData?: any;
  pagination?: boolean;
  pinnedBottomRowData?: any;
  detailCellRenderer?: any;
  headerToggleTitle?: string;
  DropdownButtons?: any;
  MultiButtons?: any;
  setGridApi?: any;
  onFilterChanged?: any;
  onFilterOpened?: any;
  paginationAutoPageSize?: boolean;
  rowSelection?: any;
  customDropDown?: boolean;
  noWrapper?: boolean;
  onPaginationChanged?: any;
  paginatedComponent?: any;
  onCellValueChanged?: any;
  refreshButton?: boolean;
  refreshClick?: () => {};
  importOptionRequired?: boolean;
  notImportAble?: boolean;
}

const AgGrid = ({
  columnDefs,
  defaultColDef = {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
  },
  onGridReady,
  btnTitle,
  onBtnClick = () => {},
  cancelBtnTitle,
  onCancelBtnClick = () => {},
  detailCellRendererParams,
  masterDetail = false,
  rowData,
  onRowSelected,
  actionButtons = [],
  performanceReview,
  pinnedBottomRowData,
  detailCellRenderer,
  headerToggleTitle = '',
  DropdownButtons = [],
  MultiButtons = [],
  rowSelection,
  customDropDown = true,
  noWrapper = false,
  onCellValueChanged,
  paginatedComponent,
  refreshButton,
  refreshClick,
  importOptionRequired = false,
  notImportAble = false,
}: any) => {
  // const gridRef = useRef<AgGridReactType>(null);
  const gridRefFromContext = useContext(GridContext);
  return (
    <div className="col-12">
      <SectionWrapper className={`${noWrapper ? 'no-wrapper' : ''}`}>
        <div className="custom-flex-between mb-4">
          <div className="bottom-margin-remove">
            {actionButtons?.length > 0 && (
              <GridAction actionButtons={actionButtons} />
            )}
            <div>
              {headerToggleTitle?.length > 0 && (
                <ToggleButton toggleTitle={headerToggleTitle} />
              )}
            </div>
          </div>

          <div className="custom-flex-start align-items-center">
            {DropdownButtons.length > 0 &&
              DropdownButtons?.map((item: any) => {
                return item.title ? (
                  <CustomDropdown
                    className={'custom-grey-outline-btn'}
                    title={item.title}
                    items={item.dropdownOptions}
                  />
                ) : null;
              })}

            {cancelBtnTitle && (
              <button
                className="friday-btn-primary friday-btn-md font-medium ms-2"
                onClick={onCancelBtnClick}
                type="button"
              >
                {cancelBtnTitle}
              </button>
            )}
            {btnTitle && (
              <button
                className="friday-btn-primary friday-btn-md font-medium ms-2"
                onClick={onBtnClick}
                type="button"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="5.586"
                    height="5.387"
                    viewBox="0 0 5.586 5.387"
                  >
                    <path
                      id="Path_2060"
                      data-name="Path 2060"
                      d="M.618-2.621H2.884v2.17H3.932v-2.17H6.2V-3.668H3.932v-2.17H2.884v2.17H.618Z"
                      transform="translate(-0.618 5.838)"
                      fill="#0b77e3"
                    />
                  </svg>
                </span>
                {btnTitle}
              </button>
            )}
            {MultiButtons &&
              MultiButtons?.map((item: any) => {
                return (
                  <button
                    className="friday-btn-primary friday-btn-md font-medium ms-2"
                    onClick={item.onClick}
                    type="button"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="5.586"
                        height="5.387"
                        viewBox="0 0 5.586 5.387"
                      >
                        <path
                          id="Path_2060"
                          data-name="Path 2060"
                          d="M.618-2.621H2.884v2.17H3.932v-2.17H6.2V-3.668H3.932v-2.17H2.884v2.17H.618Z"
                          transform="translate(-0.618 5.838)"
                          fill="#0b77e3"
                        />
                      </svg>
                    </span>
                    {item.title}
                  </button>
                );
              })}
            {refreshButton && (
              <span onClick={refreshClick} style={{ cursor: 'pointer' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="icon-reset-device"
                  width="22.982"
                  height="22.982"
                  viewBox="0 0 22.982 22.982"
                >
                  <path
                    id="icon-reset-device-2"
                    data-name="icon-reset-device"
                    d="M5.979,4.8A11.492,11.492,0,0,1,22.9,20.087l-3.666-6.6h3.447A9.193,9.193,0,0,0,7.125,6.858L5.979,4.8ZM21,22.187A11.492,11.492,0,0,1,4.08,6.9l3.666,6.6H4.3a9.193,9.193,0,0,0,15.559,6.633Z"
                    transform="translate(-2 -2)"
                    fill="#0b77e3"
                  />
                </svg>
              </span>
            )}
            {importOptionRequired && (
              <ImportExportFiles notImportAble={notImportAble} />
            )}
          </div>
        </div>
        <div className="custom-aggrid-table">
          <AgGridReact
            ref={gridRefFromContext}
            rowData={rowData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            defaultColDef={{
              ...defaultColDef,
              flex: 1,
              filter: true,
              floatingFilter: true,
              sortable: true,
              singleClickEdit: true,
              cellStyle: ({ colDef: { editable } }: any) => {
                if (editable) {
                  return {
                    border: '1px solid #BCBCBC',
                    borderRadius: '4px',
                    background: 'transparent',
                    height: '32px',
                    opacity: 1,
                    margin: '5px 18px',
                    width: 'auto',
                    lineHeight: '32px',
                    minWidth: '170px',
                  };
                }
              },
            }}
            onRowDataUpdated={param => {
              let columnsLength = param.columnApi.getAllColumns()?.length ?? 0;
              if (columnsLength > 7) {
                param.columnApi.autoSizeAllColumns();
              }
            }}
            // onPaginationChanged={}
            onFirstDataRendered={param => {
              let columnsLength = param.columnApi.getAllColumns()?.length ?? 0;

              if (columnsLength > 7) {
                param.columnApi.autoSizeAllColumns();
              }
            }}
            domLayout="normal"
            rowSelection={rowSelection}
            onRowSelected={onRowSelected}
            pinnedBottomRowData={pinnedBottomRowData}
            detailCellRenderer={detailCellRenderer}
            masterDetail={masterDetail}
            onCellValueChanged={onCellValueChanged}
            detailCellRendererParams={detailCellRendererParams}
            overlayNoRowsTemplate={'<span>No rows found!</span>'}
            suppressRowClickSelection={false}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          {paginatedComponent}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default AgGrid;
