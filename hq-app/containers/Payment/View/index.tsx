import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { PAYMENT_METHOD_DETAILS } from '../types';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const PaymentView = ({
  paymentMethodDetails,
}: {
  paymentMethodDetails?: PAYMENT_METHOD_DETAILS;
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('paymentMethodDetails');

  const customData = {
    ...paymentMethodDetails,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(`/settings/payment/edit/${paymentMethodDetails?.id}`);
  };

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={paymentMethodDetails?.name ?? 'Payment Method'}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={paymentMethodDetails?.code ?? paymentMethodDetails?.id}
      onClick={onEdit}
      isTabHeaderShow={true}
    />
  );
};

export default withPermissions(PaymentView, {
  permissionName: PERMISSIONS.VIEW_PAYMENT_METHOD,
});
