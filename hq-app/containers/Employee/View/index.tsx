import React, { useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { EMPLOYEE_DETAILS } from '../types';
import { getQueryParam, setQueryParams } from '@fridayfood/shared/components';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
const EmployeeView = ({
  employeeDetails,
}: {
  employeeDetails: EMPLOYEE_DETAILS;
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

  const customData = {
    ...employeeDetails,
    activeTab,
  };
  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(
      `/staffmanagement/employee/edit/${
        employeeDetails?.id
      }/?tabs=${getQueryParam('tabs')}`,
    );
  };
  setQueryParams('tabs', activeTab === 'general' ? 0 : 1);
  return (
    <GeneralView
      loading={false}
      headerData={tabsData}
      title={employeeDetails?.name ?? 'Employee'}
      getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
      id={employeeDetails?.code}
      isTabHeaderShow
      onClick={onEdit}
    />
  );
};

export default withPermissions(EmployeeView, {
  permissionName: PERMISSIONS.VIEW_EMPLOYEE,
});
