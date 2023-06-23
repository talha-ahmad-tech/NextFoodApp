import ClustersView from '@/containers/Clusters/View';

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { ClusterApis } from 'services/modules/clusters.api';

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  try {
    const token = req?.cookies?.token;
    await setDefaultHeader(token);
    const response = await getMethod({
      url: ClusterApis.ClustersList,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
    });
    if (response?.status === 200) {
      const id = response?.data[0]?.id;
      if (response?.data?.length && id) {
        return {
          props: {
            ...response?.data,
            id: Number(params?.id),
          },
          redirect: {
            permanent: false,
            destination: `/storemanagement/clusters/${id}`,
          },
        };
      } else {
        return {
          redirect: {
            permanent: false,
            destination: `/storemanagement/clusters/add`,
          },
          props: {
            ...response?.data,
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

export default ClustersView;
