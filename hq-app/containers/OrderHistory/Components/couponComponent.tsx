const Coupon = (props: any) => {
  const couponTable: object[] = [
    {
      name: 'Coupon Availed',
      value: props.couponAvailed ? 'Yes' : 'No',
    },
    {
      name: 'Coupon Name',
      value: props.couponName ?? '-',
    },
    {
      name: 'Total Discount',
      value: props.couponDiscount ?? '-',
    },
  ];
  const Data = () => {
    return couponTable.map((item: any) => {
      return (
        <tr>
          <td style={{ paddingRight: 20, paddingTop: 15 }}>
            <b>{`${item.name}`}:</b>
          </td>
          <td>
            <b>{` ${item.value}`}</b>
          </td>
        </tr>
      );
    });
  };
  return <>{Data()}</>;
};
export default Coupon;
