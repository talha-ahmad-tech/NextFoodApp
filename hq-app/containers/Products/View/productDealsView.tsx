import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfigurationDeals } from '../config';
import { DEAL_DETAILS } from '../types';
import { getQueryParam, setQueryParams } from '@fridayfood/shared/components';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const ProductDealsView = (props: DEAL_DETAILS) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData: DEAL_DETAILS = {
    ...props,
    activeTab,
  };
  const tabsData = tabsConfigurationDeals(customData ?? {});

  const onEdit = () => {
    router.push(
      `/menumanagement/products/productsdeal/edit/${
        props?.id
      }/?tabs=${getQueryParam('tabs')}`,
    );
  };

  setQueryParams(
    'tabs',
    activeTab === 'general' ? 0 : activeTab === 'dealDetails' ? 1 : 2,
  );
  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={props?.name ?? 'Product-Deal'}
      id={props?.code ?? props?.id}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      onClick={onEdit}
      isTabHeaderShow
    />
  );
};

export default withPermissions(ProductDealsView, {
  permissionName: PERMISSIONS.VIEW_PRODUCT,
});
