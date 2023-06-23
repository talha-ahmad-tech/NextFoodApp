import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { TAX_DETAILS } from '../types';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';

const TaxView = ({ taxDetails }: { taxDetails: TAX_DETAILS }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const customData = {
    ...taxDetails,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(`/settings/tax/edit/${taxDetails?.id}`);
  };

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={taxDetails?.name ?? 'Tax'}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={taxDetails?.code ?? taxDetails?.id}
      onClick={onEdit}
      isTabHeaderShow
    />
  );
};

export default withPermissions(TaxView, {
  permissionName: PERMISSIONS.VIEW_TAX,
});
