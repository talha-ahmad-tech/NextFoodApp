import React, { forwardRef, LegacyRef, memo, Ref } from 'react';
import ListHeaderWrapper from '../ListHeaderWrapper';
import RectangleButton from '../RectangleButton';
import SectionWrapper from '../SectionWrapper';
import Tabs from '../TabsDetail';
import Image from 'next/image';
import AgGridForm from '../AgGridForm';
import { AgGridReact } from 'ag-grid-react';

interface IListWrapperMain {
  onClick?: any;
  headerData?: any;
  addButton?: boolean;
  data?: Array<any> | undefined;
  labelToShow?: string;
  submitKey?: string;
  Component?: React.ReactNode | any;
  onItemClick?: any;
  heading?: string;
  addBtnClick?: any;
  listTitle?: string;
  showToggle?: boolean;
  toggleTitleTab?: string;
  toggleTitle?: string;
  customClass?: string;
  selectedOption?: string | number;
  whenEmptyMessage?: string;
  columnDefs?: any;
  rowData?: any;
  onRowSelected?: any;
  onGridReady?: any;
  gridComponent?: boolean;
  gridHeading?: string;
  onFirstDataRendered?: any;
}
const ListWrapperMain = (
  props?: IListWrapperMain,
  ref?: LegacyRef<AgGridReact<any>> | undefined,
) => {
  const {
    onClick = () => {},
    headerData,
    data,
    Component,
    onItemClick,
    labelToShow = 'name',
    submitKey = 'id',
    heading,
    addBtnClick = () => {},
    listTitle = '',
    addButton = true,
    showToggle = false,
    toggleTitleTab = '',
    toggleTitle = '',
    customClass = '',
    selectedOption,
    whenEmptyMessage,
    columnDefs,
    rowData,
    onRowSelected,
    onGridReady,
    gridComponent = false,
    gridHeading = '',
    onFirstDataRendered,
  } = props as IListWrapperMain;
  return (
    <>
      {listTitle && (
        <ListHeaderWrapper
          toggleTitleTab={toggleTitleTab}
          toggleTitle={toggleTitle}
          title={listTitle}
          showToggleButton={showToggle}
        />
      )}
      <div className="ag-theme-alpine">
        <div className="friday-vertical-tabs-container">
          <div className="custom-tabs-wrapper custom-flex-start p-0">
            <div className="me-4">
              <SectionWrapper className="list-view-wrapper">
                <div className="header-btn-wrapper">
                  <h6>{heading}</h6>
                  {addButton ? (
                    <>
                      <button className="no-icon" onClick={addBtnClick}>
                        <Image
                          src="/assets/svgs/plus.svg"
                          alt="no"
                          width={20}
                          height={20}
                        />
                      </button>
                    </>
                  ) : // <h6>{heading}</h6>
                  null}
                </div>
                <div className="buttons-wrapper-main">
                  {data?.length ? (
                    data?.map((item: any, index: number) => {
                      console.log(item[`${submitKey}`], selectedOption);
                      return (
                        <RectangleButton
                          key={index}
                          label={
                            item[`${labelToShow}`] ??
                            item.itemGroupName ??
                            item.name
                          }
                          selected={
                            item[`${submitKey}`].toString() ===
                            selectedOption?.toString()
                          }
                          onClick={() => {
                            onItemClick(item[`${submitKey}`]);
                          }}
                        />
                      );
                    })
                  ) : (
                    <RectangleButton label={whenEmptyMessage ?? ''} />
                  )}
                </div>
              </SectionWrapper>
            </div>
            <>
              {gridComponent ? (
                <AgGridForm
                  ref={ref as Ref<AgGridReact<any>> | undefined}
                  customClass="custom-large-card"
                  heading={gridHeading}
                  rowSelection="multiple"
                  columnDefs={columnDefs}
                  rowData={rowData}
                  onRowSelected={onRowSelected}
                  onGridReady={onGridReady}
                  onFirstDataRendered={onFirstDataRendered}
                />
              ) : (
                <div className={`${customClass ? `${customClass}` : 'w-100'}`}>
                  {headerData ? (
                    <Tabs
                      tabs={headerData}
                      isTabHeaderShow={false}
                      onClick={onClick}
                    />
                  ) : (
                    <Component />
                  )}
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(forwardRef(ListWrapperMain));
