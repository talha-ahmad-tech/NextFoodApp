import TaxView from '@/containers/Tax/View';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { taxApis } from 'services/modules/tax.api';
export default TaxView;

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);
  const response = await getMethod({
    url: `${taxApis.taxDetails(Number(params?.id))}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });

  if (response?.status === 200) {
    return {
      props: { taxDetails: response?.data, id: params?.id },
    };
  }

  return {
    props: { taxDetails: {}, id: params?.id },
  };
}
