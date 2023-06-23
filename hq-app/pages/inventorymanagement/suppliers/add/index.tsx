import SuppliersCreate from 'containers/Suppliers/Add';
import { getMethod, setDefaultHeader } from 'services/axios';
import { SuppliersApis } from 'services/modules/suppliers.api';
import { GetServerSidePropsContext } from 'next';

export default SuppliersCreate;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  await setDefaultHeader(req?.cookies?.token);
  try {
    const response = await getMethod({
      url: SuppliersApis.supplierNumberSeries,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
    });
    if (response?.status === 200) {
      const { code } = response?.data;
      return { props: { code: code } };
    }
  } catch (error) {
    console.log(error);
  }
  return { props: { code: '' } };
}
