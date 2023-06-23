import KitchensView from '@/containers/KitchenPrinter/View/index';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { KitchenApis } from 'services/modules/kitchen.api';

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  try {
    const token = req?.cookies?.token;
    await setDefaultHeader(token);
    const response = await getMethod({
      url: KitchenApis.KitchenList,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
    });
    if (response?.status === 200) {
      const id = response?.data?.items[0]?.id;
      if (response?.data?.items?.length && id) {
        return {
          props: {
            ...response?.data?.items,
            id: Number(params?.id),
          },
          redirect: {
            permanent: false,
            destination: `/settings/kitchenPrinter/${id}`,
          },
        };
      } else {
        return {
          redirect: {
            permanent: false,
            destination: `/settings/kitchenPrinter/add`,
          },
          props: {
            ...response?.data?.items,
            id: Number(params?.id),
          },
        };
      }
    }
  } catch (error: unknown) {
    // const statusCode = error.response?.status || 500;
    const { message = '' }: { message?: string } = error || {};
    return {
      props: { errorCode: 'statusCode', hasError: true, message },
    };
  }
}

export default KitchensView;
