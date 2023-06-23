import CompanyList from 'containers/Company';

export default CompanyList;

// export async function getServerSideProps({ req }: GetServerSidePropsContext) {
//   const token = req?.cookies?.token;
//   await setDefaultHeader(token as string);
//   const response = await getMethod({
//     url: '/Preference/metaData?name=finishedproduct',
//     baseUrl: process.env.NEXT_PUBLIC_API_URL_FILTERS,
//   });

//   if (response.status === 200) {
//     return {
//       props: { data: response?.data, type: 'finishedproduct' },
//     };
//   }
//   return { props: { errorCode: 400 || 500 } };
// }
