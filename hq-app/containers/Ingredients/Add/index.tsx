import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { ADD_UPDATE_INGREDIENTS } from '../types';
import FormEnhancer from './FormEnhancer';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const IngredientsForm = (props: ADD_UPDATE_INGREDIENTS) => {
  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper title="Products - Ingredients" />
      <FormEnhancer {...props} />
    </div>
  );
};

export default withPermissions(IngredientsForm, {
  permissionName: PERMISSIONS.CREATE_PRODUCT,
});
