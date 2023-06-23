import TableorderingView from '@/containers/Tableordering/View';
import { GetServerSidePropsContext } from 'next';
// import { getMethod, setDefaultHeader } from 'services/axios';
// import { TableorderingApis } from 'services/modules/tableordering.api';
export default TableorderingView;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  // const token = req?.cookies?.token;
  // await setDefaultHeader(token);
  // const response = await getMethod({
  //   url: `${ TableorderingApis.TableorderingDetails}?Id=${params?.id}`,
  //   baseUrl: process.env.NEXT_PUBLIC_API_URL_V2,
  // });

  // if (response?.status === 200) {
  //   return {
  //     props: { tableorderingDetails: response?.data?.result, id: params?.id },
  //   };
  // }

  return {
    props: { tableorderingDetails: {}, id: params?.id },
  };
}
