import { ADD_PRICELIST } from '@/containers/Pricelist/types';
import ToggleProvider from '@fridayfood/shared/components/Context/ToggleContext';
import PricelistCreate from 'containers/Pricelist/Add';

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { PriceListApis } from 'services/modules/pricelist.api';

const PriceListEditWrapper = (props: ADD_PRICELIST) => {
  return (
    <ToggleProvider>
      <PricelistCreate {...props} />
    </ToggleProvider>
  );
};
export default PriceListEditWrapper;

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;

  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: `${PriceListApis.PriceListDetails(Number(params?.id))}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
  });

  if (response?.status === 200) {
    return {
      props: { ...response?.data, id: params?.id },
    };
  }

  return {
    props: { priceListDetails: {}, id: params?.id },
  };
}
