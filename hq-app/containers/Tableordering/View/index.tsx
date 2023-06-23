import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { TABLEORDERING_DETAILS } from '../types';

const TableorderingView = ({
  tableorderingDetails,
}: {
  tableorderingDetails: TABLEORDERING_DETAILS;
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData = {
    ...tableorderingDetails,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(`/tableordering/edit/${tableorderingDetails?.id}`);
  };

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={tableorderingDetails?.name ?? 'Table Order'}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={tableorderingDetails?.id ?? ''} // change tableorderingDetails.code
      onClick={onEdit}
    />
  );
};

export default TableorderingView;
