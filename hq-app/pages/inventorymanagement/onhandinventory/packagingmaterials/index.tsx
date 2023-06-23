import {
  FiltersListProvider,
  FiltersProvider,
} from '@fridayfood/shared/components';
import OnHandInventory from 'containers/OnHandInventory';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OnhandeInventoryWrapper = (props: any) => {
  return (
    <FiltersListProvider>
      <FiltersProvider>
        <OnHandInventory {...props} />
      </FiltersProvider>
    </FiltersListProvider>
  );
};
export default OnhandeInventoryWrapper;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: '/api/Preference/metaData?name=packaginginventory',
    baseUrl: process.env.NEXT_PUBLIC_API_URL_FILTERS,
  });

  if (response.status === 200) {
    return {
      props: { data: response?.data, type: 'packaginginventory' },
    };
  }
  return { props: { errorCode: 400 || 500 } };
}
