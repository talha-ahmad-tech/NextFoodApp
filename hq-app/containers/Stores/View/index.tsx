import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { STORE_DETAILS } from '../types';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
import { useFetchStoreProductDetailsQuery } from 'services/modules/stores.api';
import { getQueryParam, setQueryParams } from '@fridayfood/shared/components';
const StoreView = ({ storeDetails }: { storeDetails: STORE_DETAILS }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('stores');
  const { data } = useFetchStoreProductDetailsQuery(storeDetails?.id);
  console.log('datata', data);
  const customData = {
    ...storeDetails,
    activeTab,
    data,
  };

  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(
      `/storemanagement/stores/edit/${storeDetails?.id}/?tabs=${getQueryParam(
        'tabs',
      )}`,
    );
  };
  setQueryParams('tabs', activeTab === 'stores' ? 0 : 1);
  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={storeDetails?.name ?? 'store'}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={storeDetails?.code ?? storeDetails?.code}
      isTabHeaderShow
      onClick={onEdit}
    />
  );
};

export default withPermissions(StoreView, {
  permissionName: PERMISSIONS.VIEW_STORE,
});
