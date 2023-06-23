'use client';
import { ListHeaderWrapper, TabsVertical } from '@fridayfood/shared/components';
import ProductFinishedProductsListing from './Tabs/productFinishedProductListing';
import ProductDealsListing from './Tabs/productDealsListing';

const Products = () => {
  const tabs = [
    {
      name: 'finishedproduct',
      title: 'Finished Product',
      id: '1',
      module: <ProductFinishedProductsListing />,
      classes: '',
    },
    {
      name: 'deals',
      title: 'Deals',
      id: '3',
      module: <ProductDealsListing />,

      classes: '',
    },
  ];

  return (
    <div className="ag-theme-alpine">
      <div className="row">
        <ListHeaderWrapper title={'Products'} />
      </div>
      <TabsVertical
        tabs={tabs}
        isNonWrap
        // btnTitle="Add Product"
        initialPath="/menumanagement/products"
        // onClick={() => setOpenProducts(true)}
        noMargin="true"
        noBorder="true"
      />
    </div>
  );
};

export default Products;
