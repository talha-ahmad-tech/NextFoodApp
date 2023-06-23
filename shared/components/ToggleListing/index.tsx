import AgGrid from '../AgGrid';
import ListHeaderWrapper from '../ListHeaderWrapper';
import GridAction, { IGridAction } from '../AgGrid/GridActions';
import { AgGridReact } from 'ag-grid-react';
import { Icon } from '../Icon';
import SectionWrapper from '../SectionWrapper';
import CustomDropdown from '../CustomDropdown';
import Action from '../Svgs/Actions';
import ToggleButton from '../ToggleButton';
import ExportIcon from '../Svgs/ExportIcon';
import Download from '../Svgs/Download';
import ExcelImport from '../Svgs/ExcelImport';
const tableactions = [
  { name: 'Export to Excel', icon: <ExportIcon /> },
  { name: 'Download Excel Format', icon: <Download /> },
  { name: 'Import from Excel', icon: <ExcelImport /> },
];
interface IToggleListing {
  title: string;
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
  pinnedTopRowData?: any;
  pinnedBottomRowData?: any;
  detailCellRenderer?: any;

  showToggleButton?: boolean;
  headerToggleTitle?: string;
  DropdownButtons?: any;
  MultiButtons?: any;
  rowData: object[];
  onCellValueChanged?: any;
  columnDefs: { field: string; type?: undefined | string }[];
  className?: string;
  rowSelection?: 'single' | 'multiple';
  onSelectionChanged?: any;
  onGridReady?: any;
  getRowStyle?: any;
  components?: any;
  actionButtons?: IGridAction | any;
}

const ToggleListing = ({
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
  pinnedTopRowData,
  detailCellRenderer,
  pinnedBottomRowData,
  showToggleButton,
  headerToggleTitle = '',
  DropdownButtons = [],
  MultiButtons = [],
  rowData,
  columnDefs,
  onCellValueChanged,
  onGridReady = () => {},
  className = '',
  rowSelection,
  onSelectionChanged = () => {},
  getRowStyle = () => {},
  components,
  actionButtons,
}: IToggleListing) => {
  return (
    <div className="ag-theme-alpine">
      <div className="row">
        <ListHeaderWrapper
          title={title}
          mainMenu={mainMenu}
          disabled={disabled}
          showToggleButton={showToggleButton}
        />
        <div className="col-12">
          <SectionWrapper>
            <div className="friday-card-body">
              <div className="custom-flex-between mb-4">
                <div className="bottom-margin-remove">
                  <div className="custom-flex-start align-items-center">
                    {headerToggleTitle?.length > 0 && (
                      <ToggleButton toggleTitle={headerToggleTitle} />
                    )}
                    {actionButtons?.length > 0 && (
                      <GridAction actionButtons={actionButtons} />
                    )}
                  </div>
                </div>

                <div className="custom-flex-start align-items-center">
                  {DropdownButtons.length > 0 &&
                    DropdownButtons?.map((item: any) => {
                      return item.title ? (
                        <CustomDropdown
                          className={
                            item.class ? item.class : 'custom-grey-outline-btn'
                          }
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
                  <CustomDropdown
                    className="custom-grey-outline-btn no-icon"
                    items={tableactions}
                    icon={<Action />}
                  />
                </div>
              </div>
              <div className="custom-aggrid-table custom-table-height">
                <AgGridReact
                  className={className}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  onGridReady={onGridReady}
                  defaultColDef={{
                    filter: true,
                    floatingFilter: true,
                    sortable: true,
                  }}
                  onRowSelected={onRowSelected}
                  components={components}
                  domLayout="normal"
                  onCellValueChanged={onCellValueChanged}
                  rowSelection={rowSelection}
                  onSelectionChanged={onSelectionChanged}
                  getRowStyle={getRowStyle}
                  noRowsOverlayComponent={() => (
                    <Icon variant="noProduct"></Icon>
                  )}
                />
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
};

export default ToggleListing;
