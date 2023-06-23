import DenominationsView from '@/containers/Denominations/View/index';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { DenominationsApis } from 'services/modules/denominations.api';

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  try {
    const token = req?.cookies?.token;
    await setDefaultHeader(token);
    const response = await getMethod({
      url: DenominationsApis.DenominationsList,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
    });
    if (response?.status === 200) {
      const id = response?.data[0]?.id > 0 ? response?.data[0]?.id : null;
      if (response?.data?.length && id) {
        return {
          props: {
            ...response?.data,
            id: Number(params?.id),
          },
          redirect: {
            permanent: false,
            destination: `/settings/denominations/${id}`,
          },
        };
      } else {
        return {
          redirect: {
            permanent: false,
            destination: `/settings/denominations/add`,
          },
          props: {
            ...response?.data,
            id: Number(params?.id),
          },
        };
      }
    }
  } catch (error: unknown) {
    const { message = '' }: { message?: string } = error || {};
    return {
      props: { errorCode: 'statusCode', hasError: true, message },
    };
  }
}

export default DenominationsView;
