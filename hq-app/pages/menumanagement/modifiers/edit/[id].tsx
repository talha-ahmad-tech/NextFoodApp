import { ProductsProvider } from '@fridayfood/shared/components';
import ModifiersCreate from 'containers/Modifiers/Add';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Wrapper = (props?: any) => {
  return (
    <ProductsProvider>
      <ModifiersCreate {...props} />
    </ProductsProvider>
  );
};

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { ModifierApis } from 'services/modules/modifiers.api';

export default Wrapper;

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  try {
    const response = await getMethod({
      url: `${ModifierApis.ModifierDetails(Number(params?.id))}`,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
    });

    if (response?.status === 200) {
      return {
        props: { modifierDetails: response?.data, id: params?.id },
      };
    }
    return {
      props: { modifierDetails: {}, id: 0 },
    };
  } catch {
    return {
      redirect: {
        destination: '/menumanagement/modifiers',
      },
    };
  }
}
