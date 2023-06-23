import IngredientsUpdate from '@/containers/Ingredients/Add';

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { IngredientsApis } from 'services/modules/ingredients.api';

export default IngredientsUpdate;

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: `${IngredientsApis.IngredientDetails(Number(params?.id))}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
  });

  if (response?.status === 200) {
    return {
      props: { ...response?.data, id: params?.id },
    };
  }

  return {
    props: { IngredientsDetails: {}, id: params?.id },
  };
}
