import ProductDealsView from '@/containers/Products/View/productDealsView';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { ApiPrefix } from 'services/modules/products.api';
export default ProductDealsView;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  try {
    const response = await getMethod({
      url: `${ApiPrefix}deal/${params?.id}/by-id`,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
    });

    if (response.status === 200) {
      return {
        props: { ...response?.data, id: Number(params?.id) },
      };
    }
  } catch {
    return {
      redirect: {
        destination: '/menumanagement/products/deals',
      },
    };
  }
}
