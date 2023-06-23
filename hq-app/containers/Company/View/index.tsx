import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { COMPANY_DETAILS } from '../types';

const CompanyView = ({
  companyDetails,
}: {
  companyDetails: COMPANY_DETAILS;
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData = {
    // ...companyDetails,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(`/settings/company/edit/${companyDetails?.id}`);
  };

  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      isTabHeaderShow
      title="Company"
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      // id={companyDetails?.code}
      onClick={onEdit}
    />
  );
};

export default CompanyView;
