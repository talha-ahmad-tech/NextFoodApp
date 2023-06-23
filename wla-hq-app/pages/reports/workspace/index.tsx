import React from 'react';
import Workspace from '@fridayfood/shared/components/Workspace';
import { FilterHeader } from '@fridayfood/shared/components';

const Reports = () => {
  return (
    <>
      <FilterHeader showField={false} />
      <div>
        <Workspace />
      </div>
    </>
  );
};

export default Reports;
