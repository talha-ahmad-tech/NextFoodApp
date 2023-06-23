import React, { forwardRef, LegacyRef, Ref } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  IColumnToolPanel,
  SideBarDef,
} from 'ag-grid-community';

import GridAction, { IGridAction } from '../AgGrid/GridActions';
import { CardWithLabel } from '@fridayfood/ui-toolkit';

type AgGridFormTypes = {
  detailCellRendererParams?: any;
  rowData?: object[];
  onCellValueChanged?: any;
  columnDefs: { field: string; type?: undefined | string }[];
  className?: string;
  rowSelection?: 'single' | 'multiple';
  onRowSelected?: any;
  onSelectionChanged?: any;
  onGridReady?: any;
  getRowStyle?: any;
  actionButtons?: IGridAction | any;
  components?: any;
  btnTitle?: string;
  onBtnClick?: any;
  onCancelBtnClick?: () => void;
  cancelBtnTitle?: any;
  heading?: string;
  isActionRequired?: boolean;
  pinnedBottomRowData?: any;
  detailCellRenderer?: any;
  masterDetail?: boolean;
  rowHeight?: number;
  groupSelectsChildren?: boolean;
  rightActions?: IGridAction | any;
  sideBar?: SideBarDef | string | string[] | boolean | null;
  defaultColDef?: ColDef;
  onColumnVisible?: any;
  onColumnValueChangeRequest?: any;
  autoHeightTable?: boolean;
  customClass?: string;
  onFirstDataRendered?: any;
  customHeight?: boolean;
  leftActionButtons?: IGridAction | any;
};

const AgGridForm = (
  {
    detailCellRendererParams,
    rowData,
    columnDefs,
    onCellValueChanged,
    onGridReady = () => {},
    className = '',
    rowSelection = 'single',
    onSelectionChanged = () => {},
    getRowStyle = () => {},
    actionButtons = [],
    components,
    btnTitle = '',
    onBtnClick,
    onCancelBtnClick = () => {},
    cancelBtnTitle,
    heading = '',
    isActionRequired = false,
    onRowSelected,
    pinnedBottomRowData,
    detailCellRenderer,
    masterDetail,
    rowHeight,
    groupSelectsChildren,
    rightActions = [],
    sideBar,
    defaultColDef,
    onColumnVisible,
    onColumnValueChangeRequest,
    autoHeightTable = false,
    customClass = '',
    onFirstDataRendered,
    customHeight = false,
    leftActionButtons = [],
  }: AgGridFormTypes,
  ref: LegacyRef<AgGridReact<any>> | undefined,
) => {
  return (
    <>
      {autoHeightTable ? (
        <div className="col-12">
          <div
            className={`custom-aggrid-table auto-height-table ${
              customHeight ? 'custom-aggrid-table custom-height-table' : ''
            }`}
          >
            <AgGridReact
              onFirstDataRendered={onFirstDataRendered}
              ref={ref}
              className={className}
              rowData={rowData}
              columnDefs={columnDefs}
              onGridReady={onGridReady}
              defaultColDef={{
                ...defaultColDef,
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
              components={components}
              domLayout="normal"
              onCellValueChanged={onCellValueChanged}
              rowSelection={rowSelection}
              onSelectionChanged={onSelectionChanged}
              getRowStyle={getRowStyle}
              onRowSelected={onRowSelected}
              pinnedBottomRowData={pinnedBottomRowData}
              detailCellRenderer={detailCellRenderer}
              masterDetail={masterDetail}
              rowHeight={rowHeight}
              detailCellRendererParams={detailCellRendererParams}
              groupSelectsChildren={groupSelectsChildren}
              sideBar={sideBar}
              onColumnVisible={onColumnVisible}
              onColumnValueChangeRequest={onColumnValueChangeRequest}
            />
          </div>
        </div>
      ) : (
        <div className="col-12">
          <div className={`${customClass ? `${customClass}` : ''}`}>
            <CardWithLabel
              label={heading}
              btnTitle={btnTitle}
              onClick={onBtnClick}
              action={isActionRequired}
              btnType="primary"
              cancelBtnTitle={cancelBtnTitle}
              onCancelBtnClick={onCancelBtnClick}
            >
              <div className="friday-card-body">
                {actionButtons?.length > 0 ||
                  rightActions?.length > 0 ||
                  (leftActionButtons?.length > 0 && (
                    <GridAction
                      actionButtons={actionButtons ?? []}
                      rightActions={rightActions ?? []}
                      leftActionButtons={leftActionButtons ?? []}
                    />
                  ))}
                <div
                  className={`custom-aggrid-table ${
                    autoHeightTable ? 'auto-height-table' : ''
                  }`}
                >
                  <AgGridReact
                    onViewportChanged={onFirstDataRendered}
                    // onFirstDataRendered={onFirstDataRendered}
                    ref={ref}
                    className={className}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                    defaultColDef={{
                      ...defaultColDef,
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
                    suppressExcelExport={true}
                    components={components}
                    domLayout="normal"
                    onCellValueChanged={onCellValueChanged}
                    rowSelection={rowSelection}
                    onSelectionChanged={onSelectionChanged}
                    getRowStyle={getRowStyle}
                    onRowSelected={onRowSelected}
                    pinnedBottomRowData={pinnedBottomRowData}
                    detailCellRenderer={detailCellRenderer}
                    masterDetail={masterDetail}
                    rowHeight={rowHeight}
                    detailCellRendererParams={detailCellRendererParams}
                    groupSelectsChildren={groupSelectsChildren}
                    sideBar={sideBar}
                    onColumnVisible={onColumnVisible}
                    onColumnValueChangeRequest={onColumnValueChangeRequest}
                  />
                </div>
              </div>
            </CardWithLabel>
          </div>
        </div>
      )}
    </>
  );
};

export default forwardRef(AgGridForm);
