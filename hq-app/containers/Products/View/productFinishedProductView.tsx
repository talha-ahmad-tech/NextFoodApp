/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfigurationFinishedProduct } from '../config';
import { FINISHED_PRODUCTS_DETAILS } from '../types';
import { getQueryParam, setQueryParams } from '@fridayfood/shared/components';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';

const finishedProductsView = (props: FINISHED_PRODUCTS_DETAILS) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData: FINISHED_PRODUCTS_DETAILS = {
    ...props,
    activeTab,
  };
  const tabsData = tabsConfigurationFinishedProduct(customData ?? {});
  const onEdit = () => {
    router.push(
      `/menumanagement/products/finishedproduct/edit/${
        props?.id
      }/?tabs=${getQueryParam('tabs')}`,
    );
  };

  setQueryParams('tabs', activeTab === 'general' ? 0 : 1);

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={props?.name ?? 'Products-Finished Products'}
      id={props?.code ?? props?.id}
      getActiveTab={(tab: { id: string }) => {
        setActiveTab(tab.id);
      }}
      onClick={onEdit}
      isTabHeaderShow
    />
  );
};

export default withPermissions(finishedProductsView, {
  permissionName: PERMISSIONS.VIEW_PRODUCT,
});
