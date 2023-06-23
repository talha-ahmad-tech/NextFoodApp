import EmployeeCreate from 'containers/Employee/Add';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { EmployeeApis } from 'services/modules/employee.api';
export default EmployeeCreate;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  await setDefaultHeader(req?.cookies?.token);
  const response = await getMethod({
    url: EmployeeApis.EmployeeNumberSeries,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });

  if (response?.status === 200) {
    const { code } = response?.data;
    return { props: { code: code } };
  }
  return { props: { code: '' } };
}
