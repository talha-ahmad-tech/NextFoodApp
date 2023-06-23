import React from 'react';
import { useContext } from 'react';
import { Loader } from '@fridayfood/ui-toolkit';
import ListHeaderWrapper from '../ListHeaderWrapper';
import Tabs from '../TabsDetail';
import { ToggleContext } from '../Context/ToggleContext';
import { GeneralListing, SectionWrapper, TOGGLE_OPTIONS } from '..';
import LineHeader from '@fridayfood/shared/components/LineHeader';

interface ITabsListing {
  loading: boolean;
  headerData?: any;
  linesData?: any;
  title?: any;
  id?: string;
  onClick?: any;
  showToggle?: boolean;
  isTabHeaderRequired?: boolean;
  isHeaderTitleRequired?: boolean;
  LineHeaderData?: any;
  lineBtnTitle?: any;
  onLineBtnClick?: () => void;
  getActiveTab?: (tab: any) => void;
  onRowSelected?: any;
  rowSelection?: any;
  columnDefs?: any;
  onGridReady?: any;
  listingTittle?: any;
}

const TabsListing = ({
  loading,
  linesData = [],
  title = '',
  id,
  showToggle = false,
  isTabHeaderRequired = true,
  isHeaderTitleRequired = true,
  LineHeaderData = [],
  lineBtnTitle = '',
  onLineBtnClick = () => {},
  onRowSelected,
  rowSelection,
  columnDefs,
  onGridReady,
}: ITabsListing) => {
  const activeTab = useContext(ToggleContext);
  return (
    <div className="ag-theme-alpine col-12">
      {isHeaderTitleRequired && (
        <ListHeaderWrapper
          title={title}
          showToggleButton={showToggle}
          id={id}
        />
      )}

      <div className="friday-vertical-tabs-container">
        <div className="row m-0">
          {loading ? (
            <Loader />
          ) : activeTab === TOGGLE_OPTIONS.header ? (
            <GeneralListing
              columnDefs={columnDefs}
              onGridReady={onGridReady}
              title={''}
            />
          ) : (
            <>
              {LineHeaderData.length > 0 && (
                <div className="custom-flex-col">
                  <LineHeader items={LineHeaderData} />
                </div>
              )}

              <Tabs
                tabs={linesData}
                lineBtnTitle={lineBtnTitle}
                onLineBtnClick={onLineBtnClick}
                isTabHeaderShow={isTabHeaderRequired}
                onRowSelected={onRowSelected}
                rowSelection={rowSelection}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabsListing;
