import ItemGroupCreate from '@/containers/inventoryAdjustment/itemGroup/Add';

import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { ItemGroupApis } from 'services/modules/itemGroup.api';

export default ItemGroupCreate;

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  try {
    const response = await getMethod({
      url: `${ItemGroupApis.ItemGroupDetails(Number(params?.id))}`,
      baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
    });

    if (response?.status === 200) {
      return {
        props: { ItemGroupDetails: response?.data, id: params?.id },
      };
    }

    return {
      props: { ItemGroupDetails: {}, id: 0 },
    };
  } catch {
    return {
      redirect: {
        destination: '/menumanagement/itemgroup',
      },
    };
  }
}
