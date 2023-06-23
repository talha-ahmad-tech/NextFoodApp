import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { FINISHEDPRODUCT_DETAILS } from '../types';
import FormEnhancer from './FormEnhancer';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const ProductsdealForm = (props?: FINISHEDPRODUCT_DETAILS) => {
  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper title="Products - Finished Product" />
      <FormEnhancer {...props} />
    </div>
  );
};

export default withPermissions(ProductsdealForm, {
  permissionName: PERMISSIONS.CREATE_PRODUCT,
});
