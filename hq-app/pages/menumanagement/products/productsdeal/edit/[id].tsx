import { PRODUCTS_DEAL_DETAILS } from '@/containers/Productsdeal/types';
import { ProductsProvider } from '@fridayfood/shared/components/Context/ProductsContext';
import ProductsdealCreate from 'containers/Productsdeal/Add';

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { ProductsDealApis } from 'services/modules/productsdeal.api';

const Wrapper = (props?: PRODUCTS_DEAL_DETAILS) => {
  return (
    <ProductsProvider>
      <ProductsdealCreate {...props} />
    </ProductsProvider>
  );
};
export default Wrapper;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: `${ProductsDealApis.DealDetails(Number(params?.id))}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
  });

  if (response?.status === 200) {
    return {
      props: { ...response?.data, id: params?.id },
    };
  }

  return {
    props: { errorCode: 404 || 500, id: params?.id },
  };
}
