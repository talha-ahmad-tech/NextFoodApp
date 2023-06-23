import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { FOOD_COSTING_DETAILS } from '../types';

const foodCostingView = ({ foodCostingDetails }: { foodCostingDetails: FOOD_COSTING_DETAILS }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData = {
    ...foodCostingDetails,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(`/foodCosting/edit/${ foodCostingDetails?.id}`);
  };

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title="All foodCosting"
      getActiveTab={(tab: {id: string}) => setActiveTab(tab.id)}
      id={ foodCostingDetails?.code}
      onClick={onEdit}
    />
  );
};

export default foodCostingView;
