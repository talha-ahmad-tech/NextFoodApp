import InventoryAdjustmentNewCreate from '@/containers/inventoryAdjustment/Add';
import { ToggleProvider } from '@fridayfood/shared/components';

const InventoryAdjustmentAddWrapper = () => {
  return (
    <ToggleProvider>
      <InventoryAdjustmentNewCreate />
    </ToggleProvider>
  );
};
export default InventoryAdjustmentAddWrapper;
