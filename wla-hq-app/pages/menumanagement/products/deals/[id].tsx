import ProductDealsView from '@/containers/Products/View/productDealsView';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
export default ProductDealsView;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: `/get-deal-by-id/${params?.id}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_WLA,
  });
  if (response.status === 200) {
    return {
      props: { ...response?.data?.data, id: params?.id },
    };
  }
  return { props: { data: 'asdd' } };
}
