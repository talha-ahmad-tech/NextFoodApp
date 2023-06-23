import PricelistView from '@/containers/Pricelist/View';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { PriceListApis } from 'services/modules/pricelist.api';
import ToggleProvider from '@fridayfood/shared/components/Context/ToggleContext';
import { PRICELIST_DETAILS } from '@/containers/Pricelist/types';

const PriceListWrapper = (props: PRICELIST_DETAILS) => {
  return (
    <ToggleProvider>
      <PricelistView {...props} />
    </ToggleProvider>
  );
};
export default PriceListWrapper;

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
