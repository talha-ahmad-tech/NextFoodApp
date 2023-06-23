import CreateKitchens from '@/containers/KitchenPrinter/Add';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { KitchenApis } from 'services/modules/kitchen.api';
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: `${KitchenApis.kitchenDetails(Number(params?.id))}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
  });

  if (response?.status === 200) {
    return {
      props: { ...response?.data, id: params?.id },
    };
  }
  return {
    props: { erroCode: response?.statusText, id: params?.id },
  };
}

export default CreateKitchens;
