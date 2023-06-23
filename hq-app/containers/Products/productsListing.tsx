import { ListHeaderWrapper, TabsVertical } from '@fridayfood/shared/components';
import { useEffect, useRef, useState } from 'react';
import ProductsModal from './productsModal';
import ProductFinishedProductsListing from './Tabs/productFinishedProductListing';
import ProductDealsListing from './Tabs/productDealsListing';
import ProductIngredientsListing from './Tabs/productIngredientsListing';
import ProductPackagingMaterialListing from './Tabs/productPackagingMaterialListing';
import FilterHeader from '../CustomFilters/Filters/CustomFilters';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
import useUtils from '../CustomFilters/Filters/useUtils';
import { useRouter } from 'next/router';
import FileImporter from '../../components/ImportExportFiles/FileImporter';
import { LOADER_TYPE } from '@/utils/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductsListing = (props?: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childRef: any = useRef(null);
  const [openProducts, setOpenProducts] = useState<boolean>(false);

  const { setFiltersQuery, setFilters, filters } = useUtils();
  const router = useRouter();
  const type = props?.type || '';

  useEffect(() => {
    // setFiltersQuery({});
    setFilters({ ...filters, userPreferences: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.pathname]);

  const [payload, setPayload] = useState<{
    filter: boolean;
    clearFilter: boolean;
    products: object;
    ingredients: object;
    packagingmaterial: object;
    deals: object;
    finishedPresetId?: string;
    ingredientPresetId?: string;
    dealsPresetId?: string;
    packagingPresetId?: string;
  }>({
    filter: false,
    clearFilter: false,
    products: {},
    ingredients: {},
    packagingmaterial: {},
    deals: {},
    finishedPresetId: '',
    ingredientPresetId: '',
    dealsPresetId: '',
    packagingPresetId: '',
  });

  const handleReset = () => {
    setPayload({
      ...payload,
      clearFilter: true,
      products: {},
      ingredients: {},
      packagingmaterial: {},
      deals: {},
      finishedPresetId:
        type === 'finishedproduct' ? '' : payload?.finishedPresetId,
      ingredientPresetId:
        type === 'ingredients' ? '' : payload?.ingredientPresetId,
      packagingPresetId:
        type === 'packagingmaterial' ? '' : payload?.packagingPresetId,
      dealsPresetId: type === 'deals' ? '' : payload?.dealsPresetId,
    });
    setFilters({ ...filters, userPreferences: [], FilterQuery: {} });
    setFiltersQuery({});
  };

  const handleApply = async (data: { value?: string }) => {
    setPayload({
      ...payload,
      clearFilter: false,
      finishedPresetId: type === 'finishedproduct' ? data?.value : '',
      ingredientPresetId: type === 'ingredients' ? data?.value : '',
      packagingPresetId: type === 'packagingmaterial' ? data?.value : '',
      dealsPresetId: type === 'deals' ? data?.value : '',
    });
  };

  const tabs = [
    {
      name: 'finishedproduct',
      title: 'Finished Product',
      id: '1',
      module:
        props?.type === 'finishedproduct' ? (
          <ProductFinishedProductsListing
            ref={childRef}
            payload={payload}
            query={props?.query}
          />
        ) : (
          <></>
        ),
      classes: '',
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      id: '2',
      module:
        props?.type === 'ingredients' ? (
          <ProductIngredientsListing ref={childRef} payload={payload} />
        ) : (
          <></>
        ),
      classes: '',
    },
    {
      name: 'deals',
      title: 'Deals',
      id: '3',
      module:
        props?.type === 'deals' ? (
          <ProductDealsListing ref={childRef} payload={payload} />
        ) : (
          <></>
        ),
      classes: '',
    },
    {
      name: 'packagingmaterial',
      title: 'Packaging Material',
      id: '4',
      module:
        props?.type === 'packagingmaterial' ? (
          <ProductPackagingMaterialListing ref={childRef} payload={payload} />
        ) : (
          <></>
        ),
      classes: '',
    },
  ];

  const GetLoaderType = () => {
    const { pathname } = router;
    if (pathname.includes('finishedproduct')) {
      return LOADER_TYPE.FINISHED_PRODUCT;
    } else if (
      pathname.includes('ingredients') ||
      pathname.includes('packagingmaterial')
    ) {
      return LOADER_TYPE.INGREDIENTS;
    } else if (pathname.includes('deals')) {
      return LOADER_TYPE.DEALS;
    } else {
      return LOADER_TYPE.EMPTY;
    }
  };

  return (
    <>
      {openProducts && (
        <ProductsModal open={openProducts} setOpen={setOpenProducts} />
      )}
      <FileImporter type={GetLoaderType() as keyof typeof LOADER_TYPE} />
      <div className="ag-theme-alpine">
        <div className="row">
          <ListHeaderWrapper title={'Products'} />
        </div>
        <FilterHeader
          clearFilter={payload?.clearFilter}
          data={props?.data?.component ?? {}}
          handleApply={handleApply}
          handleReset={handleReset}
          type={props?.type}
          setPayload={setPayload}
          payload={payload}
        />
        <TabsVertical
          tabs={tabs}
          isNonWrap
          btnTitle="Add Product"
          initialPath="/menumanagement/products"
          onClick={() => setOpenProducts(true)}
          noMargin="true"
          noBorder="true"
          importOptionRequired={true}
        />
      </div>
    </>
  );
};

export default withPermissions(ProductsListing, {
  permissionName: PERMISSIONS.CREATE_PRODUCT,
});
