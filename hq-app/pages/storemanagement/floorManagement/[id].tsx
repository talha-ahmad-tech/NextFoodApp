'use client';
import { GetServerSidePropsContext } from 'next';
import FloorView from '@/containers/FloorManagement/View';
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

export default FloorView;
