import CompanyCreate from '@/containers/Company/Add';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { CompanyEndpoints } from 'services/modules/company.api';

export default CompanyCreate;

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  const id = params?.id;
  await setDefaultHeader(token as string);
  try {
    const response = await getMethod({
      url: CompanyEndpoints.customerView(id as string),
      baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
    });

    if (response.status === 200) {
      return {
        props: { ...response?.data, id: params?.id },
      };
    }
  } catch {
    return {
      redirect: {
        destination: '/companymanagement/company',
      },
    };
  }
}
