import ProductsdealCreate from 'containers/Productsdeal/Add';
import { ProductsProvider } from '@fridayfood/shared/components/Context/ProductsContext';
import { PRODUCTS_DEAL_DETAILS } from '@/containers/Productsdeal/types';
import { getMethod, setDefaultHeader } from 'services/axios';
// import { getMethod, setDefaultHeader } from 'services/axios';
// import { ProductsDealApis } from 'services/modules/productsdeal.api';
// import { GetServerSidePropsContext } from 'next';
const Wrapper = (props?: PRODUCTS_DEAL_DETAILS) => {
  return (
    <ProductsProvider>
      <ProductsdealCreate {...props} />
    </ProductsProvider>
  );
};
export default Wrapper;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({ req }: any) {
  await setDefaultHeader(req?.cookies?.token);

  const response = await getMethod({
    url: `/api/app/number-series/number-series-code?Name=Deal`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });

  if (response?.status === 200) {
    const { code } = response?.data;
    return {
      props: { code: code },
    };
  }
  return {
    props: { code: '' },
  };
}
