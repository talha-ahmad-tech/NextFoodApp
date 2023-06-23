import { ItemTable, CardWithLabel } from '@fridayfood/ui-toolkit';
import TableGrid from '@fridayfood/shared/components/AgGrid/clientGrid';
import React, { memo, useEffect, useState } from 'react';
import AgGrid from '../AgGrid';

interface ITabsContent {
  Tabs: object[];
  onClick?: any;
  onRowSelected?: any;
  btnTitle?: any;
  onBtnClick?: any;
  rowSelection?: any;
  lineHeader?: string;
  topBorder?: boolean;
  onSelectionChanged?: any;
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
  onSelectionChanged,
}: ITabsContent) => {
  return (
    <div className="tab-content w-100" id="v-pills-tabContent">
      {Tabs?.map((item: any, index: number) => {
        return item.type === 'twoTable' ? (
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
                tableData={item.tableData1}
                image={item.image}
              />
              <div className="border-t-1 pt-3">
                <div className="friday-card-header">
                  <h2 className="friday-card-title">{item.label2}</h2>
                </div>
              </div>

              <ItemTable
                classes={item.classes}
                key={item.id}
                id={item.id}
                label={item.label}
                tableData={item.tableData2}
                image={item.image}
              />
            </div>
          </CardWithLabel>
        ) : item.type === 'custom' ? (
          <CardWithLabel
            key={item.id}
            classes={item.classes}
            id={item.id}
            label={item.label}
            action={item.actions}
            onClick={onClick}
          >
            <div>
              <ItemTable
                classes={item.classes}
                key={item.id}
                id={item.id}
                label={item.label}
                tableData={item.topTableData}
                image={item.image}
              />

              <TableGrid
                lineHeader={item.TitlecolumnDef1}
                rowData={item.dataRows}
                columnDefs={item.columnDef1}
                btnTitle={btnTitle}
                onBtnClick={onBtnClick}
                pinnedBottomRowData={item?.pinnedBottomRowForDeals}
                onRowSelected={onRowSelected}
                pagination={false}
                rowSelection={rowSelection}
              />
              {item.dataDetail?.map(
                (detail: { [key: string]: string | number | boolean }) => {
                  return (
                    <>
                      <hr />
                      <TableGrid
                        rowData={[detail]}
                        columnDefs={item.columnDef2}
                        lineHeader={
                          detail.dealPriceType === 1
                            ? 'In-Store Price'
                            : detail.dealPriceType === 2
                            ? 'Delivery Price'
                            : detail.dealPriceType === 3
                            ? 'Collection Price'
                            : ''
                        }
                        btnTitle={btnTitle}
                        onBtnClick={onBtnClick}
                        onRowSelected={onRowSelected}
                        pagination={false}
                        rowSelection={rowSelection}
                      />
                    </>
                  );
                },
              )}
            </div>
          </CardWithLabel>
        ) : item.type === 'forProductOnly' ? (
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
              <hr />

              <TableGrid
                rowData={item.modifierData}
                columnDefs={item.columnDefsForModifiers}
                btnTitle={btnTitle}
                onBtnClick={onBtnClick}
                onRowSelected={onRowSelected}
                pagination={false}
                rowSelection={rowSelection}
                lineHeader={item.title1}
                topBorder={topBorder}
              />
              <hr />

              <TableGrid
                rowData={item.recipeData}
                columnDefs={item.columnDefs}
                btnTitle={btnTitle}
                onBtnClick={onBtnClick}
                onRowSelected={onRowSelected}
                pagination={false}
                rowSelection={rowSelection}
                lineHeader={item.title2}
                topBorder={topBorder}
              />
            </div>
          </CardWithLabel>
        ) : item.type === 'grid' ? (
          <CardWithLabel
            key={item.id}
            classes={item.classes}
            id={item.id}
            label={item.label}
            action={item.actions}
            onClick={onClick}
          >
            <div className="ag-theme-alpine">
              <TableGrid
                rowData={item.dataRows}
                columnDefs={item.columnDefs}
                btnTitle={btnTitle}
                onBtnClick={onBtnClick}
                onRowSelected={onRowSelected}
                rowSelection={rowSelection}
                onSelectionChanged={onSelectionChanged}
              />
            </div>
          </CardWithLabel>
        ) : item?.type === 'both' ? (
          <CardWithLabel
            key={item?.id}
            classes={item?.classes}
            id={item?.id}
            label={item?.label}
            action={item?.actions}
            onClick={onClick}
          >
            <ItemTable
              classes={item.classes}
              key={item.id}
              id={item.id}
              label={item.label}
              tableData={item.tableData}
              image={item.image}
            />
            {item?.CustomTitleComponent && item.CustomTitleComponent()}
            <div className="ag-theme-alpine">
              <TableGrid
                rowData={item.dataRows}
                columnDefs={item.columnDefs}
                btnTitle={btnTitle}
                onBtnClick={onBtnClick}
                onRowSelected={onRowSelected}
                rowSelection={rowSelection}
                onSelectionChanged={onSelectionChanged}
                pagination={false}
              />
            </div>
          </CardWithLabel>
        ) : (
          <CardWithLabel
            key={item?.id}
            classes={item?.classes}
            id={item?.id}
            label={item?.label}
            action={item?.actions}
            onClick={onClick}
          >
            <div className="friday-card-body">
              <ItemTable
                classes={item.classes}
                key={item.id}
                id={item.id}
                label={item.label}
                tableData={item.tableData}
                image={item.image}
              />
            </div>
          </CardWithLabel>
        );
      })}
    </div>
  );
};

export default memo(TabsContent);
