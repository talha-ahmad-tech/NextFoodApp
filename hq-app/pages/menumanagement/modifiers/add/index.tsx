// import { ProductsProvider } from '@fridayfood/shared/components';
import ModifiersCreate from 'containers/Modifiers/Add';
// import { getMethod, setDefaultHeader } from 'services/axios';
// import { ModifierApis } from 'services/modules/modifiers.api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Wrapper = (props?: any) => {
  return (
    // <ProductsProvider>
      <ModifiersCreate {...props} />
    // </ProductsProvider>s
  );
};
export default Wrapper;

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const seq = {
  sequenceNumber: 10,
  code: 123,
};

export async function getServerSideProps() {
  // export async function getServerSideProps({ req }: any) {
  //   await setDefaultHeader(req?.cookies?.token);
  //   const response = await getMethod({
  //     url: ModifierApis.ModifierSequenceNo,
  //   });
  //   let sequenceNo = '';

  //   if (response?.status === 200) {
  //     const { code } = response?.data?.result;
  //     sequenceNo = code;
  //   }
  return {
    props: { code: seq.code },
  };
}
