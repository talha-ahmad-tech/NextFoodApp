import ItemGroupForm from '@/containers/inventoryAdjustment/itemGroup/Add';
// import { getMethod, setDefaultHeader } from 'services/axios';
// import { ItemGroupApis } from 'services/modules/itemGroup.api';
import { GetServerSidePropsContext } from 'next';

export default ItemGroupForm;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({}: GetServerSidePropsContext) {
  // export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  //   await setDefaultHeader(req?.cookies?.token);
  //   const response = await getMethod({
  //     url: ItemGroupApis.ItemGroupSequenceNo,
  //   });
  //   let sequenceNo = '';

  //   if (response?.status === 200) {
  //     const { code } = response?.data?.result;
  //     sequenceNo = code;
  //   }
  return {
    props: { code: 123 },
  };
}
