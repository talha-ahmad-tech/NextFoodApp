import TabsContent from './TabsContent';
import TabsContentLines from './TabsContentLined';
import TabsHeader from './TabsHeader';

interface ITabs {
  tabs: object[];
  onClick?: any;
  isTabHeaderShow?: boolean;
  lineBtnTitle?: any;
  onLineBtnClick?: () => void;
  getActiveTab?: (tab: any) => void;
  onRowSelected?: any;
  rowSelection?: any;
  lineHeader?: string;
  topBorder?: boolean;
  lineHeaderTittle?: string;
  isLoading?: boolean;
  isLineView?: boolean;
  onSelectionChanged?: any;
}

const Tabs = ({
  tabs = [],
  lineBtnTitle = '',
  onClick = () => {},
  isTabHeaderShow = false,
  onLineBtnClick = () => {},
  getActiveTab = () => {},
  onRowSelected,
  rowSelection,
  lineHeader,
  topBorder,
  isLineView,
  onSelectionChanged,
}: ITabs) => {
  return (
    <div className="custom-tabs-wrapper custom-flex-start p-0">
      {isTabHeaderShow && (
        <div className="me-4">
          <TabsHeader Tabs={tabs} getActiveTab={getActiveTab} />
        </div>
      )}
      <>
        {isLineView ? (
          <TabsContentLines
            Tabs={tabs}
            onClick={onClick}
            onRowSelected={onRowSelected}
            onBtnClick={onLineBtnClick}
            btnTitle={lineBtnTitle}
            rowSelection={rowSelection}
            lineHeader={lineHeader}
            topBorder={topBorder}
          />
        ) : (
          <TabsContent
            Tabs={tabs}
            onClick={onClick}
            onRowSelected={onRowSelected}
            onBtnClick={onLineBtnClick}
            btnTitle={lineBtnTitle}
            rowSelection={rowSelection}
            lineHeader={lineHeader}
            topBorder={topBorder}
            onSelectionChanged={onSelectionChanged}
          />
        )}
      </>
    </div>
  );
};

export default Tabs;
