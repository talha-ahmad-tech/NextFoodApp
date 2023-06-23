import TerminalsView from '@/containers/Terminals/View';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { TerminalsApis } from 'services/modules/terminals.api';
export default TerminalsView;

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);
  const response = await getMethod({
    url: `${TerminalsApis.terminalDetails(Number(params?.id))}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE_APP,
  });

  if (response?.status === 200) {
    return {
      props: {
        terminalsDetails: response?.data,
        id: params?.id,
      },
    };
  }
}
