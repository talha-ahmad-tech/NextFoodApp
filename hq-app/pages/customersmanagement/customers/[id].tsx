import CustomersView from '@/containers/Customers/View';

export default CustomersView;

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { CustomerApis } from 'services/modules/customers.api';

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);
  const response = await getMethod({
    url: `${CustomerApis.CustomerDetails(Number(params?.id))}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });

  if (response?.status === 200) {
    return {
      props: {
        customerDetails: response?.data,
        viewId: Number(params?.id),
      },
    };
  }

  return {
    props: { customerDetails: {}, customerId: Number(params?.id) },
  };
}
