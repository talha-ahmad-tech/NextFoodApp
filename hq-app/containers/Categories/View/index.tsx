import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { CATEGORY_DETAILS } from '../types';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const CategoriesView = ({
  CategoryDetails,
}: {
  CategoryDetails: CATEGORY_DETAILS;
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData = {
    ...CategoryDetails,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(`/menumanagement/categories/edit/${CategoryDetails?.id}`);
  };

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={CategoryDetails?.name ?? 'Category'}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={CategoryDetails?.id}
      onClick={onEdit}
      isTabHeaderShow
    />
  );
};

export default withPermissions(CategoriesView, {
  permissionName: PERMISSIONS.VIEW_CATEGORY,
});
