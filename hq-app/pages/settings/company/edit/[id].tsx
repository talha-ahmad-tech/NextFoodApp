import CompanyCreate from 'containers/Company/Add';

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { CompanyApis } from 'services/modules/company.api';

export default CompanyCreate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: `${ CompanyApis.CompanyDetails}?Id=${params?.id}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_V2,
  });

  if (response?.status === 200) {
    return {
      props: { companyDetails: response?.data?.result, id: params?.id},
    };
  }

  return {
    props: { companyDetails: {}, id: params?.id },
  };
}
