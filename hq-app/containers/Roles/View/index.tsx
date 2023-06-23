import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { ROLES_DETAILS } from '../types';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const RolesView = ({ rolesDetails }: { rolesDetails: ROLES_DETAILS }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData = {
    ...rolesDetails,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(`/roles/edit/${rolesDetails?.id}`);
  };

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={rolesDetails?.name ?? 'Role Detail'}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={rolesDetails?.id ?? ''}
      onClick={onEdit}
    />
  );
};

export default withPermissions(RolesView, {
  permissionName: PERMISSIONS.VIEW_ROLE,
});
