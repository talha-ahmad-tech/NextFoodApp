import TaxCreate from 'containers/Tax/Add';
import { getMethod, setDefaultHeader } from 'services/axios';
import { taxApis } from 'services/modules/tax.api';
export default TaxCreate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({ req }: any) {
  await setDefaultHeader(req?.cookies?.token);
  const response = await getMethod({
    url: taxApis.SequenceNo,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });

  if (response?.status === 200) {
    const { code } = response?.data;
    return { props: { code: code } };
  }
}
