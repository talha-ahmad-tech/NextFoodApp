'use client';
import RegionsView from '@/containers/Regions/View/index';
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

export default RegionsView;
