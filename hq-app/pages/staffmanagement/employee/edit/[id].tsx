import EmployeeCreate from 'containers/Employee/Add';

export default EmployeeCreate;

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { EmployeeApis } from 'services/modules/employee.api';

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: `${EmployeeApis.EmployeeDetails(params?.id)}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });

  if (response?.status === 200) {
    return {
      props: { ...response?.data, id: params?.id },
    };
  }

  return {
    props: { employeeDetails: {}, id: params?.id },
  };
}
