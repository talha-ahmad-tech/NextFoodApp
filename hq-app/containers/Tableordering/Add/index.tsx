import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { ADD_UPDATE_TABLEORDERING } from '../types';
import FormFormEnhancer from './FormEnhancer';

const TableorderingForm = (props: ADD_UPDATE_TABLEORDERING) => {
  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper title="Table Ordering" />
      <FormFormEnhancer {...props} />
    </div>
  );
};

export default TableorderingForm;
