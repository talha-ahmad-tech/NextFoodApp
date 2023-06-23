import StatsTable from '@/containers/OrderHistory/statsTable';
import { ToggleProvider } from '@fridayfood/shared/components';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { OrderHistoryApis } from 'services/modules/orderhistory.api';
// export default StatsTable;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const orderHistoryStats = (props?: any) => {
  return (
    <ToggleProvider>
      <StatsTable {...props} />
    </ToggleProvider>
  );
};
export default orderHistoryStats;
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);
  const response = await getMethod({
    url: `${OrderHistoryApis.OrderHistoryStat}/${params?.id}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_ORDER,
  });

  if (response?.status === 200) {
    return {
      props: { ...response?.data },
    };
  }

  return {
    props: {},
    id: params?.id,
  };
}
