import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { ADD_UPDATE_PACKAGINGMATERIAL } from '../types';
import FormEnhancer from './FormEnhancer';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const PackagingMaterialForm = (props: ADD_UPDATE_PACKAGINGMATERIAL) => {
  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper title="Products - Packaging Material" />
      <FormEnhancer {...props} />
    </div>
  );
};

export default withPermissions(PackagingMaterialForm, {
  permissionName: PERMISSIONS.CREATE_PRODUCT,
});
