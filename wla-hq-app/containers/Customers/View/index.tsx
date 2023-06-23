import React, { useEffect, useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
// import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { CUSTOMER_DETAILS } from '../types';
import { getMethod } from 'services/axios';
import { CustomerApis } from 'services/modules/customers.api';

const CustomersView = ({
  customerDetails,
  id,
}: {
  customerDetails: CUSTOMER_DETAILS;
  id: number | string;
}) => {
  // const router = useRouter();
  const [activeTab, setActiveTab] = useState('customer');
  const [address, setAddress] = useState<object[]>([]);
  const [orderHistory, setOrderHistory] = useState<object[]>([]);
  const [pointHistory, setPointHistory] = useState<object[]>([]);
  const detailAndAddress = async () => {
    const AddressResponse = await getMethod({
      url: `${CustomerApis.CustomerAddress}/${id}`,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_WLA,
    });
    if (
      AddressResponse?.status === 200 &&
      AddressResponse?.data?.data?.length
    ) {
      const temp = [...AddressResponse?.data?.data];
      setAddress([...temp]);
    }
    const OrderHistoryResponse = await getMethod({
      url: `${CustomerApis.CustomerOrderHisotry}/${id}`,
    });
    if (
      OrderHistoryResponse?.status === 200 &&
      OrderHistoryResponse?.data?.pagination?.data?.length
    ) {
      const temp = [...OrderHistoryResponse?.data?.pagination?.data];
      setOrderHistory([...temp]);
    }
    const pointHistoryResponse = await getMethod({
      url: `${CustomerApis.CustomerPointHisotry}/${id}`,
    });
    if (
      pointHistoryResponse?.status === 200 &&
      pointHistoryResponse?.data?.data?.length
    ) {
      const temp = [...pointHistoryResponse?.data?.data];
      setPointHistory([...temp]);
    }
  };

  useEffect(() => {
    detailAndAddress();
  }, []);

  const customData = {
    ...customerDetails,
    address: [...address],
    orderHistory: [...orderHistory],
    customerHistory: [...pointHistory],
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={`${customerDetails?.firstName ?? 'Customer'} ${
        customerDetails?.lastName ?? ''
      }`}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={customerDetails?.id}
      isTabHeaderShow
    />
  );
};

export default CustomersView;
