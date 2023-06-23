import DiscountCodeView from '@/containers/DiscountCodes/View';

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { discountApi } from 'services/modules/discount.api';

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  try {
    const token = req?.cookies?.token;
    await setDefaultHeader(token);
    const response = await getMethod({
      url: discountApi.DiscountList,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_WLA,
    });
    if (response?.status === 200) {
      const id = response?.data?.data[0]?.id;
      if (response?.data?.data?.length && id) {
        return {
          props: {
            ...response?.data?.data,
            id: Number(params?.id),
          },
          redirect: {
            permanent: false,
            destination: `/settings/discountcode/${id}`,
          },
        };
      } else {
        return {
          redirect: {
            permanent: false,
            destination: `/settings/discountcode/add`,
          },
          props: {
            ...response?.data?.data,
            id: Number(params?.id),
          },
        };
      }
    }
  } catch (error: unknown) {
    // const statusCode = error.response?.status || 500;
    const { message = '' }: { message?: string } = error || {};
    return {
      props: { errorCode: 'statusCode', hasError: true, message },
    };
  }
}

export default DiscountCodeView;
