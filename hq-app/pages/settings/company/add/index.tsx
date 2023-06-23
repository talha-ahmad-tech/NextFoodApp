import CompanyCreate from 'containers/Company/Add';
// import { getMethod, setDefaultHeader } from 'services/axios';
// import { CompanyApis } from 'services/modules/company.api';
import { GetServerSidePropsContext } from 'next';

export default CompanyCreate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({}: // req
GetServerSidePropsContext) {
  // await setDefaultHeader(req?.cookies?.token);
  // const response = await getMethod({
  //   url: '',
  //   // CompanyApis.CompanySequenceNo
  // });
  // let sequenceNo = '';

  // if (response?.status === 200) {
  //   const { code } = response?.data?.result;
  //   sequenceNo = code ?? '000-l';
  // }
  return {
    props: { code: '000-L' },
  };
}
