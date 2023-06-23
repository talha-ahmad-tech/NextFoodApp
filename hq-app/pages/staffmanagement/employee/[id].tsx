import EmployeeView from '@/containers/Employee/View';
export default EmployeeView;
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { EmployeeApis } from 'services/modules/employee.api';

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);
  const response = await getMethod({
    url: `${EmployeeApis.EmployeeDetails(params?.id)}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });

  if (response?.status === 200) {
    return {
      props: { employeeDetails: response?.data, id: params?.id },
    };
  }

  return {
    props: { employeeDetails: {}, id: params?.id },
  };
}
