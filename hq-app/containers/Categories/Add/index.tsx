import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { ADD_UPDATE_FROM_PROPS } from '../types';
import FormFormEnhancer from './FormEnhancer';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const CategoriesForm = (props: ADD_UPDATE_FROM_PROPS) => {
  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper
        title={props.id ? 'Update Category' : 'Add Category'}
      />
      <FormFormEnhancer {...props} />
    </div>
  );
};

export default withPermissions(CategoriesForm, {
  permissionName: PERMISSIONS.CREATE_CATEGORY,
});
