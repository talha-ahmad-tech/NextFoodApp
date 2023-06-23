import FinishedproductCreate from '@/containers/Finishedproduct/Add';
import { FINISHEDPRODUCT_DETAILS } from '@/containers/Finishedproduct/types';
import { ProductsProvider } from '@fridayfood/shared/components';
import { getMethod, setDefaultHeader } from 'services/axios';
// import { GetServerSidePropsContext } from 'next';
// import { getMethod, setDefaultHeader } from 'services/axios';
// import { FinishedproductApis } from 'services/modules/finishedproduct.api';
const Wrapper = (props?: FINISHEDPRODUCT_DETAILS) => {
  return (
    <ProductsProvider>
      <FinishedproductCreate {...props} />
    </ProductsProvider>
  );
};
export default Wrapper;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({ req }: any) {
  await setDefaultHeader(req?.cookies?.token);

  try {
    //   const response = await NumberSeries('Ingredient');
    const response = await getMethod({
      url: `/api/app/number-series/number-series-code?Name=Product`,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
    });

    if (response?.status === 200) {
      const { code } = response?.data;
      return {
        props: { code: code },
      };
    }
  } catch {
    return {
      props: { code: '' },
    };
  }

  return {
    props: { code: '' },
  };
}
