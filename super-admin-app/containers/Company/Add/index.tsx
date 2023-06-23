import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { COMPANY_DETAILS } from '../types';
import FormFormEnhancer from './FormEnhancer';

const CompanyForm = (props: COMPANY_DETAILS) => {
  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper title="Create company" />
      <FormFormEnhancer {...props} />
    </div>
  );
};

export default CompanyForm;
