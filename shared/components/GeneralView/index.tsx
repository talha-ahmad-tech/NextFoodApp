import { useContext } from 'react';
import { Loader } from '@fridayfood/ui-toolkit';
import ListHeaderWrapper from '../ListHeaderWrapper';
import Tabs from '../TabsDetail';
import { ToggleContext } from '../Context/ToggleContext';
import { Icon, SectionWrapper, TOGGLE_OPTIONS } from '..';
import LineHeader from '@fridayfood/shared/components/LineHeader';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IGeneralView {
  loading: boolean;
  headerData?: any;
  linesData?: any;
  title?: any;
  id?: any;
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
  isTabHeaderShow?: boolean;
  filterLines?: any;
  onSelectionChanged?: any;
  isLineView?: boolean;
}

const GeneralView = ({
  loading,
  headerData,
  linesData = [],
  title = '',
  id,
  onClick = () => {},
  showToggle = false,
  isTabHeaderRequired = true,
  isHeaderTitleRequired = true,
  LineHeaderData = [],
  lineBtnTitle = '',
  onLineBtnClick = () => {},
  getActiveTab = () => {},
  onRowSelected,
  rowSelection,
  isTabHeaderShow = false,
  filterLines,
  onSelectionChanged,
  isLineView = false,
}: IGeneralView) => {
  const activeTab = useContext(ToggleContext);
  const router = useRouter();

  return (
    <div className="ag-theme-alpine">
      <div>
        <div className="row row-cols-auto">
          <div className="col">
            {isHeaderTitleRequired && (
              <ListHeaderWrapper
                title={title}
                showToggleButton={showToggle}
                id={id}
                isBackBtnRequired
              />
            )}
          </div>
        </div>
      </div>

      <div className="friday-vertical-tabs-container">
        <div className="row m-0">
          {loading ? (
            <Loader />
          ) : activeTab === TOGGLE_OPTIONS.header ? (
            <Tabs
              tabs={headerData}
              onClick={onClick}
              getActiveTab={tab => getActiveTab(tab)}
              isTabHeaderShow={isTabHeaderShow}
              onRowSelected={onRowSelected}
              rowSelection={rowSelection}
              onSelectionChanged={onSelectionChanged}
              isLineView={isLineView}
            />
          ) : (
            <>
              {filterLines ? (
                <>{filterLines}</>
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
                    onSelectionChanged={onSelectionChanged}
                    isLineView={isLineView}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralView;
