import ProductIngredientsView from '@/containers/Products/View/productIngredientsView';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { ApiPrefix } from 'services/modules/products.api';
// import { getMethod, setDefaultHeader } from 'services/axios';
// import { KitApis } from 'services/modules/products.api';
export default ProductIngredientsView;
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);
  try {
    const response = await getMethod({
      url: `${ApiPrefix}ingredient/${params?.id}/by-id`,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
    });

    if (response.status === 200) {
      return {
        props: { ...response?.data, id: params?.id },
      };
    }
  } catch {
    return {
      redirect: {
        destination: '/menumanagement/products/ingredients',
      },
    };
  }
}
