import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { PRODUCTS_DEAL_DETAILS } from '../types';
import FormEnhancer from './FormEnhancer';

const ProductsdealForm = (props?: PRODUCTS_DEAL_DETAILS) => {
  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper title="Products - Deal" id={`${props?.code}`} />
      <FormEnhancer {...props} />
    </div>
  );
};

export default ProductsdealForm;
