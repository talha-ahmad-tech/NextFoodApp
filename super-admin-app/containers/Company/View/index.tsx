import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { COMPANY_DETAILS } from '../types';
import { getQueryParam, setQueryParams } from '@fridayfood/shared/components';

const CompanyView = (props: COMPANY_DETAILS) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData = {
    ...props,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(
      `/companymanagement/company/edit/${props?.id}/?tabs=${getQueryParam(
        'tabs',
      )}`,
    );
  };

  setQueryParams(
    'tabs',
    activeTab === 'general'
      ? 0
      : activeTab === 'address'
      ? 1
      : activeTab === 'legalEntity'
      ? 2
      : 3,
  );

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      isTabHeaderShow
      title="Company"
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={props?.vat}
      onClick={onEdit}
    />
  );
};

export default CompanyView;
