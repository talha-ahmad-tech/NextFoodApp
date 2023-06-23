import PricelistList from 'containers/Pricelist';
import ToggleProvider from '@fridayfood/shared/components/Context/ToggleContext';

const PriceListWrapper = () => {
  return (
    <ToggleProvider>
      <PricelistList />
    </ToggleProvider>
  );
};
export default PriceListWrapper;
