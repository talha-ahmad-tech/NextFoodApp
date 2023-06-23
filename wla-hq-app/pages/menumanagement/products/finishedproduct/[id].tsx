import finishedProductsView from '@/containers/Products/View/productFinishedProductView';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
export default finishedProductsView;
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: `/get-product-by-id/${params?.id}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_WLA,
  });

  if (response.status === 200) {
    return {
      props: { ...response?.data?.data, id: params?.id },
    };
  }
  return { props: { data: 'asdd' } };
}
