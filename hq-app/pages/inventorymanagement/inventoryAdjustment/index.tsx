import { ToggleProvider } from '@fridayfood/shared/components';
import InventoryAdjustmentList from '@/containers/inventoryAdjustment';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InventoryAdjustmentWrapper = (props: any) => {
  return (
    <ToggleProvider>
      <InventoryAdjustmentList {...props} />
    </ToggleProvider>
  );
};
export default InventoryAdjustmentWrapper;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: '/api/Preference/metaData?name=inventoryadjustmentheader',
    baseUrl: process.env.NEXT_PUBLIC_API_URL_FILTERS,
  });

  if (response.status === 200) {
    return {
      props: { data: response?.data, type: 'inventoryadjustmentheader' },
    };
  }
  return { props: { errorCode: 400 || 500 } };
}
