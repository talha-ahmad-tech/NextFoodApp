import { AgGridReact } from 'ag-grid-react';

import { Icon } from '../Icon';
import GridAction, { IGridAction } from '../AgGrid/GridActions';

type AgGridFormTypes = {
  rowData: object[];
  onCellValueChanged?: any;
  columnDefs: { field: string; type?: undefined | string }[];
  className?: string;
  rowSelection?: 'single' | 'multiple' | undefined;
  onSelectionChanged?: any;
  onGridReady?: any;
  getRowStyle?: any;
  components?: any;
  actionButtons?: IGridAction | any;
  rightActions?: IGridAction | any;
  onRowSelected?: any;
};

const AgGridFormGeneric = ({
  rowData,
  columnDefs,
  onCellValueChanged,
  onGridReady = () => {},
  className = '',
  rowSelection,
  onSelectionChanged = () => {},
  getRowStyle = () => {},
  components,
  actionButtons = [],
  rightActions = [],
  onRowSelected,
}: AgGridFormTypes) => {
  return (
    <div className="col-12">
      <div className="friday-card-body">
        <GridAction actionButtons={actionButtons} rightActions={rightActions} />
        <div className="custom-aggrid-table custom-table-height">
          <AgGridReact
            className={className}
            rowData={rowData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            defaultColDef={{
              // filter: true,
              // floatingFilter: true,
              sortable: true,
            }}
            onRowSelected={onRowSelected}
            components={components}
            domLayout="normal"
            onCellValueChanged={onCellValueChanged}
            rowSelection={rowSelection}
            onSelectionChanged={onSelectionChanged}
            getRowStyle={getRowStyle}
            noRowsOverlayComponent={() => <Icon variant="noProduct"></Icon>}
          />
        </div>
      </div>
    </div>
  );
};

export default AgGridFormGeneric;
