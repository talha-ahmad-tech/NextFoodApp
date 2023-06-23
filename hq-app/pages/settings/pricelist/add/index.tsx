import { ToggleProvider } from '@fridayfood/shared/components';
import PricelistCreate from 'containers/Pricelist/Add';

const PriceListAddWrapper = () => {
  return (
    <ToggleProvider>
      <PricelistCreate />
    </ToggleProvider>
  );
};
export default PriceListAddWrapper;
