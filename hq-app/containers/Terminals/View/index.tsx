import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { ADD_TERMINALS, TRMINALS_DETAILS } from '../types';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const TerminalsView = ({ terminalsDetails, id }: TRMINALS_DETAILS) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData: ADD_TERMINALS = {
    ...terminalsDetails,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={terminalsDetails?.name ?? 'Terminal'}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={id}
      isTabHeaderShow={true}
    />
  );
};

export default withPermissions(TerminalsView, {
  permissionName: PERMISSIONS.VIEW_TERMINAL,
});
