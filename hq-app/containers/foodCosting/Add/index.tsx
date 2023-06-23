import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { ADD_UPDATE_FOOD_COSTING } from '../types';
import FormFormEnhancer from './FormEnhancer';

const foodCostingForm = (props: ADD_UPDATE_FOOD_COSTING) => {
  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper title="Create foodCosting" />
      <FormFormEnhancer {...props} />
    </div>
  );
};

export default foodCostingForm;
