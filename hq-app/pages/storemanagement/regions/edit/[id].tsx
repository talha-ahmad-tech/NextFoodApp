import CreateRegions from '@/containers/Regions/Add/index';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { RegionApis } from 'services/modules/regions.api';

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: `${RegionApis.RegionsDetails(Number(params?.id))}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });

  if (response?.status === 200) {
    return {
      props: { ...response?.data, id: params?.id },
    };
  }
  return {
    props: { erroCode: response?.statusText, id: params?.id },
  };
}

export default CreateRegions;
