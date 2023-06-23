import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { ModifierApis } from 'services/modules/modifiers.api';
import ModifiersView from '@/containers/Modifiers/View';
// import Error from '../../_error';
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  try {
    const token = req?.cookies?.token;
    await setDefaultHeader(token);
    const response = await getMethod({
      url: ModifierApis.ModifierListing,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCT,
    });
    if (response?.status === 200) {
      const id = response?.data?.items[0]?.id;
      if (response?.data?.items?.length > 0 && id) {
        return {
          props: {
            ...response?.data,
            id: Number(params?.id),
          },
          redirect: {
            permanent: false,
            destination: `/menumanagement/modifiers/${id}`,
          },
        };
      } else {
        return {
          redirect: {
            permanent: false,
            destination: `/menumanagement/modifiers/add`,
          },
          props: {
            ...response?.data,
            // id: Number(params?.id),
          },
        };
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const statusCode = error.response?.status || 500;
    const message = error.message || 'An error occurred on the server.';
    return {
      props: { errorCode: statusCode, hasError: true, statusCode, message },
    };
  }
}

export default ModifiersView;
