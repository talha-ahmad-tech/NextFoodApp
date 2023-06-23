import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { FloorApis } from 'services/modules/floors.api';
import FloorView from '@/containers/FloorManagement/View';

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  try {
    const token = req?.cookies?.token;
    await setDefaultHeader(token);
    const response = await getMethod({
      url: FloorApis.FloorList,
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
            destination: `/storemanagement/floorManagement/${id}`,
          },
        };
      } else {
        return {
          redirect: {
            permanent: false,
            destination: `/storemanagement/floorManagement/add`,
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

export default FloorView;
