import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import {
  priceListColsForLines,
  priceListDiscountCols,
  priceListPriceCols,
  tabsConfiguration,
} from '../config';
import { PRICELIST_DETAILS } from '../types';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const PricelistView = (props?: PRICELIST_DETAILS) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData = {
    ...props,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(`/settings/pricelist/edit/${props?.id}`);
  };
  const getLinesData = () => {
    return [
      {
        id: 'general',
        label: 'General',
        classes: 'active',
        actions: false,
        type: 'grid',
        dataRows: props?.priceListDetails ? props?.priceListDetails : [],
        columnDefs: [
          ...priceListColsForLines,
          ...priceListPriceCols,
          ...priceListDiscountCols,
        ],
      },
    ];
  };
  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      linesData={getLinesData()}
      title={props?.name ?? 'Price List'}
      id={props?.id ?? ''}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      showToggle
      isTabHeaderShow={true}
      onClick={onEdit}
    />
  );
};

export default withPermissions(PricelistView, {
  permissionName: PERMISSIONS.VIEW_SALES_PRICE_LIST,
});
