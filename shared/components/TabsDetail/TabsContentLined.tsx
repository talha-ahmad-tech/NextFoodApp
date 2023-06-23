import { ItemTable, CardWithLabel } from '@fridayfood/ui-toolkit';
import TableGrid from '@fridayfood/shared/components/AgGrid/clientGrid';
import React, { memo } from 'react';

interface ITabsContent {
  Tabs: object[];
  onClick?: any;
  onRowSelected?: any;
  btnTitle?: any;
  onBtnClick?: any;
  rowSelection?: any;
  lineHeader?: string;
  topBorder?: boolean;
}
const TabsContent = ({
  Tabs = [],
  onClick = () => {},
  onRowSelected,
  btnTitle,
  onBtnClick,
  rowSelection,
  lineHeader,
  topBorder,
}: ITabsContent) => {
  return (
    <div className="tab-content w-100" id="v-pills-tabContent">
      {Tabs?.map((item: any) => {
        return (
          <CardWithLabel
            key={item.id}
            classes={item.classes}
            id={item.id}
            label={item.label}
            action={item.actions}
            onClick={onClick}
          >
            <div className="ag-theme-alpine">
              <ItemTable
                classes={item.classes}
                key={item.id}
                id={item.id}
                label={item.label}
                tableData={item.tableData}
                image={item.image}
              />
              <TableGrid
                rowData={item.dataRows}
                columnDefs={item.columnDefs}
                btnTitle={btnTitle}
                onBtnClick={onBtnClick}
                onRowSelected={onRowSelected}
                pagination={false}
                rowSelection={rowSelection}
                lineHeader={lineHeader}
                topBorder={topBorder}
              />
            </div>
          </CardWithLabel>
        );
      })}
    </div>
  );
};

export default memo(TabsContent);
