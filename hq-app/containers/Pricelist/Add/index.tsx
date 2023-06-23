import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { ADD_PRICELIST } from '../types';
import FormFormEnhancer from './FormEnhancer';
import SalesPriceListLines from './SalesPriceListLines';
import { usePriceListLinesHook } from './SalesPriceListLines/LinesHooks';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const PricelistForm = (props?: ADD_PRICELIST) => {
  const { activeTab } = usePriceListLinesHook();
  console.log('props', props);

  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper
        title={props?.name ?? 'Sales Price List'}
        showToggleButton
      />
      {!activeTab ? (
        <FormFormEnhancer {...props} />
      ) : (
        <SalesPriceListLines {...props} />
      )}
    </div>
  );
};

export default withPermissions(PricelistForm, {
  permissionName: PERMISSIONS.CREATE_SALES_PRICE_LIST,
});
