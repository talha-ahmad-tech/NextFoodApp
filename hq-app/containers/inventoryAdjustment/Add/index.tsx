import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { INVENTORY_ADJUSTMENT_DETAIL } from '../types';
import FormFormEnhancer from './FormEnhancer';
import InventoryAdjustmentLines from './InventoryAdjustmentLines';
import { useInventoryAdjustment } from './InventoryAdjustmentLines/useInventoryAdjustment';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const InventoryAdjustmentNewForm = (props: INVENTORY_ADJUSTMENT_DETAIL) => {
  const { activeTab } = useInventoryAdjustment();
  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper title="Inventory Adjustment" showToggleButton />
      {!activeTab ? (
        <FormFormEnhancer {...props} />
      ) : (
        <InventoryAdjustmentLines {...props} />
      )}
    </div>
  );
};

export default withPermissions(InventoryAdjustmentNewForm, {
  permissionName: PERMISSIONS.CREATE_INVENTORY_ADJUSTMNET,
});
