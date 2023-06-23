import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfigurationFinishedProduct } from '../config';
import { FINISHED_PRODUCTS_DETAILS } from '../types';

const finishedProductsView = (props: FINISHED_PRODUCTS_DETAILS) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData: FINISHED_PRODUCTS_DETAILS = {
    ...props,
    activeTab,
  };
  const tabsData = tabsConfigurationFinishedProduct(customData ?? {});
  const onEdit = () => {
    router.push(`/menumanagement/products/edit/${props?.id}`);
  };

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={`${props?.name ?? 'Finished Product'}`}
      id={`${props?.code ?? props?.id}`}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      onClick={onEdit}
      isTabHeaderShow
    />
  );
};

export default finishedProductsView;
