import FinishedproductCreate from '@/containers/Finishedproduct/Add';
import { FINISHEDPRODUCT_DETAILS } from '@/containers/Finishedproduct/types';
import { ProductsProvider } from '@fridayfood/shared/components';

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { FinishedproductApis } from 'services/modules/finishedproduct.api';

const Wrapper = (props?: FINISHEDPRODUCT_DETAILS) => {
  return (
    <ProductsProvider>
      <FinishedproductCreate {...props} />
    </ProductsProvider>
  );
};
export default Wrapper;

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: FinishedproductApis.FinishedProductDetails(Number(params?.id)),
    baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
  });

  if (response?.status === 200) {
    return {
      props: { ...response?.data, id: params?.id },
    };
  }

  return {
    props: { errorCode: 400 || 500, id: params?.id },
  };
}
