import SuppliersView from '@/containers/Suppliers/View';
export default SuppliersView;
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { SuppliersApis } from 'services/modules/suppliers.api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);
  try {
    const response = await getMethod({
      url: `${SuppliersApis.SuppliersDetails(Number(params?.id))}`,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
    });
    if (response?.status === 200) {
      return {
        props: { suppliersDetails: response?.data, id: params?.id },
      };
    }
  } catch {
    return {
      redirect: {
        destination: '/inventorymanagement/suppliers',
      },
    };
  }
}
