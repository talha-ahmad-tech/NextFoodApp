import NumberSeriesView from '@/containers/NumberSeries/View';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { NumberSeriesApis } from 'services/modules/numberSeries.api';
export default NumberSeriesView;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);
  const response = await getMethod({
    url: NumberSeriesApis.NumberSeriesView(`${params?.id}`),
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });

  if (response?.status === 200) {
    return {
      props: { numberSeriesDetails: response?.data, id: params?.id },
    };
  }

  return {
    props: { numberSeriesDetails: {}, id: params?.id },
  };
}
