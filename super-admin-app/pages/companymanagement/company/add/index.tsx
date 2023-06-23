import CompanyCreate from '@/containers/Company/Add';

export default CompanyCreate;

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function getServerSideProps({ req }: any) {
//   await setDefaultHeader(req?.cookies?.token);

//   //   const response = await NumberSeries('Ingredient');
//   const response = await getMethod({
//     url: `/api/app/number-series/number-series-code?Name=Product`,
//     baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
//   });

//   if (response?.status === 200) {
//     const { code } = response?.data;
//     return {
//       props: { code: code },
//     };
//   }
//   return {
//     props: { code: '' },
//   };
// }
