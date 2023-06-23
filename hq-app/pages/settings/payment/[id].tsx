import PaymentView from '@/containers/Payment/View';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { PaymentApis } from 'services/modules/payment.api';
export default PaymentView;

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);
  const response = await getMethod({
    url: `${PaymentApis.PaymentMethodDetails(Number(params?.id))}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });
  if (response?.status === 200) {
    return {
      props: { paymentMethodDetails: response?.data, id: params?.id },
    };
  }

  return {
    props: {
      paymentMethodDetails: {},
      id: params?.id,
    },
  };
}
