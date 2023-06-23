import CustomersView from '@/containers/Customers/View';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { CustomerApis } from 'services/modules/customers.api';
export default CustomersView;

// eslint-disable-next-line @typescript-eslint/no-explicit-any

// remove this line when API avaliable,and add commented code

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);
  const response = await getMethod({
    url: `${CustomerApis.customerView}/${params?.id}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_WLA,
  });

  if (response?.status === 200) {
    return {
      props: { customerDetails: response?.data?.data, id: params?.id },
    };
  }
}
