import ProductsdealView from '@/containers/Productsdeal/View';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { ProductsDealApis } from 'services/modules/productsdeal.api';
export default ProductsdealView;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);
  const response = await getMethod({
    url: ProductsDealApis.DealDetails(Number(params?.id)),
    baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
  });

  if (response?.status === 200) {
    return {
      props: { ...response?.data?.result, id: params?.id },
    };
  }

  return {
    props: { errorCode: 400 || 500, id: params?.id },
  };
}
