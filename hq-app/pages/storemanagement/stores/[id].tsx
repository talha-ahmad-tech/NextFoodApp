import StoresView from '@/containers/Stores/View';
export default StoresView;

import { StoresApis } from 'services/modules/stores.api';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);
  try {
    const response = await getMethod({
      url: `${StoresApis.storeDetails(Number(params?.id))}`,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
    });
    if (response?.status === 200) {
      return {
        props: { storeDetails: response?.data, id: params?.id },
      };
    }
  } catch {
    return {
      redirect: {
        destination: '/storemanagement/stores',
      },
    };
  }
}
