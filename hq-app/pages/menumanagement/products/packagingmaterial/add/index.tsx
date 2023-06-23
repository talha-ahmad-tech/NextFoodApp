import PackagingmaterialCreate from 'containers/Packagingmaterial/Add';
import { getMethod, setDefaultHeader } from 'services/axios';
// import { getMethod, setDefaultHeader } from 'services/axios';
// import { PackagingmaterialApis } from 'services/modules/packagingmaterial.api';
// import { GetServerSidePropsContext } from 'next';

export default PackagingmaterialCreate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({ req }: any) {
  await setDefaultHeader(req?.cookies?.token);

  const response = await getMethod({
    url: `/api/app/number-series/number-series-code?Name=Ingredient`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });

  if (response?.status === 200) {
    const { code } = response?.data;
    return {
      props: { code: code },
    };
  }
  return {
    props: { code: '' },
  };
}
