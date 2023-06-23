import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { ADD_UPDATE_COMPANY } from '../types';
import FormFormEnhancer from './FormEnhancer';

const CompanyForm = (props: ADD_UPDATE_COMPANY) => {
  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper title="Create company" />
      <FormFormEnhancer {...props} />
    </div>
  );
};

export default CompanyForm;
