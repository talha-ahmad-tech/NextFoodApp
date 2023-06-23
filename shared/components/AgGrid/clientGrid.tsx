import { AgGridReact } from 'ag-grid-react';
import { ColDef, SideBarDef } from 'ag-grid-community';
// import SectionWrapper from '../SectionWrapper';
import React, { useRef } from 'react';
import { Loader } from '@fridayfood/ui-toolkit';

interface AgGridPropTypes {
  columnDefs: any;
  rowData: object[];
  defaultColDef?: ColDef;
  btnTitle?: string;
  onBtnClick?: any;
  pinnedTopRowData?: any;
  onSelectionChanged?: any;
  rowSelection?: any;
  pagination?: boolean;
  onRowSelected?: any;
  pinnedBottomRowData?: any;
  removeSideBarButton?: boolean;
  gridOptions?: any;
  onCellValueChanged?: any;
  onRowSelect?: any;
  lineHeader?: string;
  topBorder?: boolean;
  isLoading?: boolean;
}

const TableGrid = ({
  columnDefs,
  removeSideBarButton = false,
  rowData = [],
  defaultColDef = {
    sortable: true,
    resizable: true,
  },
  gridOptions = {},
  pinnedTopRowData = [],
  pinnedBottomRowData = [],
  onSelectionChanged,
  onCellValueChanged,
  rowSelection = 'single | multiple',
  pagination = true,
  onRowSelect,
  onRowSelected,
  btnTitle = '',
  onBtnClick,
  lineHeader = '',
  topBorder,
  isLoading,
}: Partial<AgGridPropTypes>) => {
  const gridRef = useRef<any>();

  const sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: '',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      },
    ],
    position: 'right',
  };

  return (
    <div className="ag-theme-alpine">
      {topBorder && <div className="border " />}
      <div className="col-12 ">
        {Boolean(lineHeader) && (
          <div className="friday-card-header border-0 py-0">
            <h6 className="friday-card-title   ">{lineHeader}</h6>
          </div>
        )}
        <div>
          <div className="custom-flex-between mb-4">
            <div className="bottom-margin-remove">
              <div className="custom-flex-start align-items-center"></div>
            </div>
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
          </div>
          <div className="custom-aggrid-table">
            <AgGridReact
              ref={gridRef}
              rowData={rowData ?? []}
              columnDefs={columnDefs}
              custom-client-grid-height
              pagination={pagination}
              paginationPageSize={40}
              rowSelection={rowSelection}
              domLayout="normal"
              animateRows={true}
              pinnedTopRowData={pinnedTopRowData}
              pinnedBottomRowData={pinnedBottomRowData}
              onSelectionChanged={onSelectionChanged}
              onRowSelected={onRowSelected}
              onRowClicked={onRowSelect}
              gridOptions={gridOptions}
              onCellValueChanged={onCellValueChanged}
              // defaultColDef={{
              //   ...defaultColDef,
              //   flex: 1,
              //   singleClickEdit: true,
              // }}
              suppressRowClickSelection={false}
              // suppressRowDeselection={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableGrid;
