import TableorderingCreate from 'containers/Tableordering/Add';
// import { getMethod, setDefaultHeader } from 'services/axios';
// import { TableorderingApis } from 'services/modules/tableordering.api';
// import { GetServerSidePropsContext } from 'next';

export default TableorderingCreate ;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({}) {
// export async function getServerSideProps({ req }: GetServerSidePropsContext) {
//   await setDefaultHeader(req?.cookies?.token);
//   const response = await getMethod({
//     url: TableorderingApis.TableorderingSequenceNo,
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
