import StoresCreate from 'containers/Stores/Add';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { StoresApis } from 'services/modules/stores.api';
export default StoresCreate;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  await setDefaultHeader(req?.cookies?.token);
  try {
    const response = await getMethod({
      url: StoresApis.storeNumberSeries,
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
