'use client';
import { GetServerSidePropsContext } from 'next';
import ItemGroupView from '@/containers/inventoryAdjustment/itemGroup/View';

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

export default ItemGroupView;
