import PaymentCreate from 'containers/Payment/Add';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { PaymentApis } from 'services/modules/payment.api';
export default PaymentCreate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  await setDefaultHeader(req?.cookies?.token);
  const response = await getMethod({
    url: PaymentApis.paymentNumberSeries,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });
  if (response?.status === 200) {
    const { code } = response?.data;
    return { props: { code: code } };
  }
  return { props: { code: '' } };
}
