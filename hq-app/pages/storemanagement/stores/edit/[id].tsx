import UpdateStores from 'containers/Stores/Add';

export default UpdateStores;

import { StoresApis } from 'services/modules/stores.api';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: StoresApis.storeDetails(Number(params?.id)),
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });
  if (response?.status === 200) {
    return {
      props: { ...response?.data, id: params?.id },
    };
  }

  return {
    props: { ...response, id: params?.id },
  };
}
