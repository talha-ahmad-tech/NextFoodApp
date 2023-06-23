import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { SUPPLIERS_DETAILS } from '../types';
import { getQueryParam, setQueryParams } from '@fridayfood/shared/components';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
const SuppliersView = ({
  suppliersDetails,
}: {
  suppliersDetails: SUPPLIERS_DETAILS;
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const customData = {
    ...suppliersDetails,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  // const onEdit = () => {
  //   router.push(`/inventorymanagement/suppliers/edit/${suppliersDetails?.id}`);
  // };

  const onEdit = () => {
    router.push(
      `/inventorymanagement/suppliers/edit/${
        suppliersDetails?.id
      }/?tabs=${getQueryParam('tabs')}`,
    );
  };
  setQueryParams('tabs', activeTab === 'general' ? 0 : 1);
  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title="All Suppliers"
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={suppliersDetails?.code}
      onClick={onEdit}
      isTabHeaderShow
    />
  );
};

export default withPermissions(SuppliersView, {
  permissionName: PERMISSIONS.VIEW_SUPPLIER,
});
