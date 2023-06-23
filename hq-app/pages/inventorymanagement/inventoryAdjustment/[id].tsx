import InventoryAdjustmentView from '@/containers/inventoryAdjustment/View';
import {
  FiltersListProvider,
  FiltersProvider,
  ToggleProvider,
} from '@fridayfood/shared/components';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';
import { inventoryAdjustmentEndpoints } from 'services/modules/inventoryAdjustment.api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InventoryAdjutmentWrapper = (props: any) => {
  return (
    <FiltersListProvider>
      <FiltersProvider>
        <ToggleProvider>
          <InventoryAdjustmentView {...props} />
        </ToggleProvider>
      </FiltersProvider>
    </FiltersListProvider>
  );
};
export default InventoryAdjutmentWrapper;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token);

  const filters = await getMethod({
    url: '/api/Preference/metaData?name=inventoryadjustmentline',
    baseUrl: process.env.NEXT_PUBLIC_API_URL_FILTERS,
  });
  const response = await getMethod({
    url: inventoryAdjustmentEndpoints.inventoryDetails(Number(params?.id)),
    baseUrl: process.env.NEXT_PUBLIC_API_URL_PRODUCTS,
  });
  if (response?.status === 200) {
    return {
      props: {
        data: filters?.data,
        inventoryAdjustmentDetails: response?.data,
        id: params?.id,
      },
    };
  }

  return {
    props: { data: {}, inventoryAdjustmentNewDetails: {}, id: params?.id },
  };
}
