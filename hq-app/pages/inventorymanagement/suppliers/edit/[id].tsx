import SuppliersCreate from 'containers/Suppliers/Add';

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { SuppliersApis } from 'services/modules/suppliers.api';

export default SuppliersCreate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: SuppliersApis.SuppliersDetails(Number(params?.id)),
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
