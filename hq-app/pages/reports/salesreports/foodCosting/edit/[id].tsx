import foodCostingCreate from 'containers/foodCosting/Add';

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { foodCostingApis } from 'services/modules/foodCosting.api';

export default foodCostingCreate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: `${ foodCostingApis.foodCostingDetails}?Id=${params?.id}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_V2,
  });

  if (response?.status === 200) {
    return {
      props: { foodCostingDetails: response?.data?.result, id: params?.id},
    };
  }

  return {
    props: { foodCostingDetails: {}, id: params?.id },
  };
}
