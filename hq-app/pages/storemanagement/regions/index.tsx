import RegionsView from '@/containers/Regions/View';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { RegionApis } from 'services/modules/regions.api';

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  try {
    const token = req?.cookies?.token;
    await setDefaultHeader(token);
    const response = await getMethod({
      url: RegionApis.RegionsList,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
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
            destination: `/storemanagement/regions/${id}`,
          },
        };
      } else {
        return {
          redirect: {
            permanent: false,
            destination: `/storemanagement/regions/add`,
          },
          props: {
            ...response?.data?.items,
            id: Number(params?.id),
          },
        };
      }
    }
  } catch (error: unknown) {
    const { message = '' }: { message?: string } = error || {};
    return {
      props: { errorCode: 'statusCode', hasError: true, message },
    };
  }
}

export default RegionsView;
