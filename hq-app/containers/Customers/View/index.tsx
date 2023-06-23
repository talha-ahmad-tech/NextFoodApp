import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { tabsConfiguration } from '../config';
import { CUSTOMER_DETAILS } from '../types';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
import { useRouter } from 'next/router';
import { useOrderByCustomerQuery } from 'services/modules/customers.api';
import type { RowSelectedEvent } from 'ag-grid-community';

const CustomersView = ({
  customerDetails,
  viewId = 0,
}: {
  customerDetails: CUSTOMER_DETAILS;
  viewId?: number;
}) => {
  const router = useRouter();
  const { id: ids = 0 }: { id?: number } = router?.query || {};

  const { data } = useOrderByCustomerQuery(viewId || ids);
  const [activeTab, setActiveTab] = useState('customer');
  const name = `${customerDetails?.firstName} ${customerDetails?.lastName}`;

  const getOrderByCustomer = () => {
    router.push(
      `/reports/salesreports/orderhistory?CustomerId=${customerDetails?.id}&Name=${name}`,
    );
  };

  const customData = {
    orderHistory: data,
    ...customerDetails,
    activeTab,
    getOrderByCustomer,
  };

  const tabsData = tabsConfiguration(customData ?? {});
  const onRowSelect = (event: RowSelectedEvent) => {
    const id = event?.data.id;
    router.push(`/reports/salesreports/orderhistory/${id}`);
  };

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={name}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={customerDetails?.code}
      isTabHeaderShow
      onRowSelected={onRowSelect}
      rowSelection={'single'}
    />
  );
};

export default withPermissions(CustomersView, {
  permissionName: PERMISSIONS.VIEW_CUSTOMER,
});
