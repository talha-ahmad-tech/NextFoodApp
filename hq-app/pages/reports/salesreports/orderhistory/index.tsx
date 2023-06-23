import {
  FiltersListProvider,
  FiltersProvider,
} from '@fridayfood/shared/components';
import { ToggleProvider } from '@fridayfood/shared/components/Context/ToggleContext';
import OrderHistory from 'containers/OrderHistory';
import { GetServerSidePropsContext } from 'next';
import { getMethod, setDefaultHeader } from 'services/axios';

const Wrapper = (props?: {
  data?: { component?: { name?: string; metaData: [] }; type?: string };
}) => {
  return (
    <FiltersListProvider>
      <FiltersProvider>
        <ToggleProvider>
          <OrderHistory {...props} />
        </ToggleProvider>
      </FiltersProvider>
    </FiltersListProvider>
  );
};

export default Wrapper;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const token = req?.cookies?.token;
  await setDefaultHeader(token as string);
  const response = await getMethod({
    url: '/api/Preference/metaData?name=orderhistory',
    baseUrl: process.env.NEXT_PUBLIC_API_URL_FILTERS,
  });

  if (response.status === 200) {
    return {
      props: { data: response?.data, type: 'orderhistory' },
    };
  }
  return { props: { errorCode: 400 || 500 } };
}
