import AgGrid from '../AgGrid';
import ListHeaderWrapper from '../ListHeaderWrapper';
import { IGridAction } from '../AgGrid/GridActions';
import type { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact';
import React, { forwardRef } from 'react';
interface IGeneralListing {
  paginatedComponent?: any;
  pagination?: boolean;
  columnDefs: any;
  onGridReady?: any;
  title?: string;
  onBtnClick?: () => void;
  btnTitle?: any;
  onCancelBtnClick?: () => void;
  cancelBtnTitle?: any;
  onRowSelect?: any;
  detailCellRendererParams?: any;
  masterDetail?: boolean;
  onRowSelected?: any;
  mainMenu?: any;
  disabled?: boolean;
  actionButtons?: IGridAction | any;
  pinnedTopRowData?: any;
  pinnedBottomRowData?: any;
  detailCellRenderer?: any;
  rowData?: any;
  showToggleButton?: boolean;
  headerToggleTitle?: string;
  DropdownButtons?: any;
  MultiButtons?: any;
  customizedFilter?: React.FC | any;
  setGridApi?: any;
  onFilterChanged?: any;
  onFilterOpened?: any;
  paginationAutoPageSize?: boolean;
  rowSelection?: string;
  onPaginationChanged?: any;
  refreshButton?: boolean;
  refreshClick?: any;
  importOptionRequired?: boolean;
  performanceReview?: boolean;
  previewColumnDefs?: any;
}

const GeneralListing = ({
  pagination,
  columnDefs,
  onGridReady,
  title,
  onBtnClick = () => {},
  btnTitle,
  onCancelBtnClick = () => {},
  cancelBtnTitle,
  onRowSelect,
  detailCellRendererParams,
  mainMenu,
  masterDetail,
  onRowSelected,
  disabled,
  actionButtons = [],
  pinnedTopRowData,
  detailCellRenderer,
  pinnedBottomRowData,
  rowData,
  showToggleButton,
  headerToggleTitle,
  DropdownButtons = [],
  MultiButtons = [],
  customizedFilter,
  setGridApi,
  onFilterChanged,
  onFilterOpened,
  rowSelection,
  onPaginationChanged,
  paginatedComponent,
  refreshButton,
  refreshClick,
  performanceReview = false,
  importOptionRequired = false,
  previewColumnDefs,
}: IGeneralListing) => {
  return (
    <div className="ag-theme-alpine">
      <div className="row">
        <ListHeaderWrapper
          title={title}
          mainMenu={mainMenu}
          disabled={disabled}
          showToggleButton={showToggleButton}
        />
        {customizedFilter && customizedFilter}
        <AgGrid
          pagination={pagination}
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          onRowSelect={onRowSelect}
          btnTitle={btnTitle}
          cancelBtnTitle={cancelBtnTitle}
          actionButtons={actionButtons}
          onBtnClick={onBtnClick}
          importOptionRequired={importOptionRequired}
          onCancelBtnClick={onCancelBtnClick}
          detailCellRendererParams={detailCellRendererParams}
          masterDetail={masterDetail}
          onRowSelected={onRowSelected}
          pinnedTopRowData={pinnedTopRowData}
          pinnedBottomRowData={pinnedBottomRowData}
          detailCellRenderer={detailCellRenderer}
          headerToggleTitle={headerToggleTitle}
          DropdownButtons={DropdownButtons}
          MultiButtons={MultiButtons}
          setGridApi={setGridApi}
          rowSelection={rowSelection}
          onFilterChanged={onFilterChanged}
          onFilterOpened={onFilterOpened}
          onPaginationChanged={onPaginationChanged}
          paginatedComponent={paginatedComponent}
          refreshButton={refreshButton}
          refreshClick={refreshClick}
          performanceReview={performanceReview}
          previewColumnDefs={previewColumnDefs}
        />
      </div>
    </div>
  );
};

export default GeneralListing;
