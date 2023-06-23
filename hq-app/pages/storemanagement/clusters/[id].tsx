import ClustersView from '@/containers/Clusters/View';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  if (params?.id) {
    return {
      props: { id: Number(params?.id) },
    };
  }

  return {
    props: { errorCode: 500 },
  };
}

export default ClustersView;
