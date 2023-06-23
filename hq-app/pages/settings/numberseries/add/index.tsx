import NumberSeriesCreate from 'containers/NumberSeries/Add';
// import { getMethod, setDefaultHeader } from 'services/axios';
// import { NumberSeriesApis } from 'services/modules/numberSeries.api';
import { GetServerSidePropsContext } from 'next';

export default NumberSeriesCreate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({}: // req
GetServerSidePropsContext) {
  // await setDefaultHeader(req?.cookies?.token);
  // const response = await getMethod({
  //   url: NumberSeriesApis.NumberSeriesSequenceNo,
  // });
  // let sequenceNo = '';

  // if (response?.status === 200) {
  //   const { code } = response?.data?.result;
  //   sequenceNo = code;
  // }
  return {
    props: { code: 'L-090' },
  };
}
