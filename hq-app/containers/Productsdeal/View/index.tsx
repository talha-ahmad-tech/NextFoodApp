import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { PRODUCTS_DEAL_DETAILS } from '../types';

const ProductsdealView = ({
  productsDealDetails,
}: {
  productsDealDetails: PRODUCTS_DEAL_DETAILS;
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData = {
    ...productsDealDetails,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(`/productsdeal/edit/${productsDealDetails?.id}`);
  };

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title="All Kits"
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={productsDealDetails?.code}
      onClick={onEdit}
    />
  );
};

export default ProductsdealView;
