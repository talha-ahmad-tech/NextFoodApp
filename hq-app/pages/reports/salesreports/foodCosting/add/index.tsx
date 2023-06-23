import foodCostingCreate from 'containers/foodCosting/Add';
import { getMethod, setDefaultHeader } from 'services/axios';
import { foodCostingApis } from 'services/modules/foodCosting.api';
import { GetServerSidePropsContext } from 'next';

export default foodCostingCreate ;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  await setDefaultHeader(req?.cookies?.token);
  const response = await getMethod({
    url: foodCostingApis.foodCostingSequenceNo,
  });
  let sequenceNo = '';

  if (response?.status === 200) {
    const { code } = response?.data?.result;
    sequenceNo = code;
  }
  return {
    props: { code: sequenceNo },
  };
}
