import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { ADD_UPDATE_SUPPLIERS } from '../types';
import FormFormEnhancer from './FormEnhancer';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const SuppliersForm = (props: ADD_UPDATE_SUPPLIERS) => {
  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper
        title={props?.id ? 'Update Suppliers' : 'Add Suppliers'}
      />
      <FormFormEnhancer {...props} />
    </div>
  );
};

export default withPermissions(SuppliersForm, {
  permissionName: PERMISSIONS.CREATE_SUPPLIER,
});
