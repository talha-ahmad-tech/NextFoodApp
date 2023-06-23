import {
  FiltersListProvider,
  FiltersProvider,
} from '@fridayfood/shared/components';
import InventoryAdjustmentListing from './inventoryAdjustmentListing';
import { ImportExportProvider } from '@fridayfood/shared/components/Context/ImportExportContext';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InventoryAdjustmentList = (props: any) => {
  return (
    <FiltersListProvider>
      <FiltersProvider>
        <ImportExportProvider>
          <InventoryAdjustmentListing {...props} />
        </ImportExportProvider>
      </FiltersProvider>
    </FiltersListProvider>
  );
};

export default withPermissions(InventoryAdjustmentList, {
  permissionName: PERMISSIONS.VIEW_INVENTORY_ADJUSTMNET,
});
