import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfigurationIngredients } from '../config';
import { INGREDIENT_DETAILS } from '../types';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';

const ProductIngredientsView = (props: INGREDIENT_DETAILS) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData: INGREDIENT_DETAILS = {
    ...props,
    activeTab,
  };
  const tabsData = tabsConfigurationIngredients(customData ?? {});

  const onEdit = () => {
    router.push(`/menumanagement/products/ingredients/edit/${props?.id}`);
  };

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={props?.name ?? 'Products-Finished Products'}
      id={props?.code ?? props?.id}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      onClick={onEdit}
      isTabHeaderShow
    />
  );
};

export default withPermissions(ProductIngredientsView, {
  permissionName: PERMISSIONS.VIEW_PRODUCT,
});
