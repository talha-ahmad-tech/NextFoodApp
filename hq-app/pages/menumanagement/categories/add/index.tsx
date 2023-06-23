import CategoriesCreate from 'containers/Categories/Add';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
// import { getMethod, setDefaultHeader } from 'services/axios';
// import { CategoryApis } from 'services/modules/categories.api';
export default CategoriesCreate;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  await setDefaultHeader(req?.cookies?.token);

  //   const response = await NumberSeries('Ingredient');
  const response = await getMethod({
    url: `/api/app/number-series/number-series-code?Name=Category`,
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
