import {
  FiltersListProvider,
  FiltersProvider,
} from '@fridayfood/shared/components';

import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
import ProductsListing from './productsListing';
import { ImportExportProvider } from '@fridayfood/shared/components/Context/ImportExportContext';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Products = (props?: any) => {
  return (
    <FiltersListProvider>
      <FiltersProvider>
        <ImportExportProvider>
          <ProductsListing {...props} />
        </ImportExportProvider>
      </FiltersProvider>
    </FiltersListProvider>
  );
};

export default withPermissions(Products, {
  permissionName: PERMISSIONS.CREATE_PRODUCT,
});
