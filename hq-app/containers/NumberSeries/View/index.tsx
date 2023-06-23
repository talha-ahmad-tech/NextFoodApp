import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { NUMBER_SERIES_DETAILS } from '../types';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const NumberSeriesView = ({
  numberSeriesDetails,
}: {
  numberSeriesDetails: NUMBER_SERIES_DETAILS;
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData = {
    ...numberSeriesDetails,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(`/settings/numberseries/edit/${numberSeriesDetails?.id}`);
  };

  return (
    <GeneralView
      isTabHeaderShow
      loading={false}
      headerData={tabsData}
      title={numberSeriesDetails?.name ?? 'Number Series'}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={numberSeriesDetails?.code}
      onClick={onEdit}
    />
  );
};

export default withPermissions(NumberSeriesView, {
  permissionName: PERMISSIONS.VIEW_NUMBER_SERIES,
});
