import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfigurationDeals } from '../config';
import { DEAL_DETAILS } from '../types';

const ProductDealsView = (props: DEAL_DETAILS) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData: DEAL_DETAILS = {
    ...props,
    activeTab,
  };
  const tabsData = tabsConfigurationDeals(customData ?? {});

  const onEdit = () => {
    router.push(`/menumanagement/products/edit/${props?.id}`);
  };

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={`${props?.name ?? 'Deals'}`}
      id={`${props?.code ?? props?.id}`}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      onClick={onEdit}
      isTabHeaderShow
    />
  );
};

export default ProductDealsView;
