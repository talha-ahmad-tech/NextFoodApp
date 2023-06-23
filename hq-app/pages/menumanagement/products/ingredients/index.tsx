import ProductsList from 'containers/Products';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
export default ProductsList;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: '/api/Preference/metaData?name=ingredients',
    baseUrl: process.env.NEXT_PUBLIC_API_URL_FILTERS,
  });

  if (response.status === 200) {
    return {
      props: { data: response?.data, type: 'ingredients' },
    };
  }
  return { props: { errorCode: 400 || 500 } };
}
