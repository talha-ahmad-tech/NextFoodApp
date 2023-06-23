import CategoriesCreate from 'containers/Categories/Add';

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { CategoryApis } from 'services/modules/categories.api';

export default CategoriesCreate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: `${CategoryApis.categoryDetails(Number(params?.id))}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
  });
     
  if (response?.status === 200) {
    return {
      props: { CategoryDetails: response?.data, id: params?.id },
    };
  }

  return {
    props: { CategoryDetails: {}, id: params?.id },
  };
}
