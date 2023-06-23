const Loyalty = (props: any) => {
  const loyaltyTable: object[] = [
    {
      name: 'Loyalty Availed',
      value: props.loyaltyAvailed ?? '-',
    },
    {
      name: 'Total Discount Value',
      value: props.loyaltyDiscountValue ?? '-',
    },
    {
      name: 'Loyalty Scheme',
      value: props.loyaltyScheme ?? '-',
    },
    {
      name: 'Loyalty Points Redeemed',
      value: props.loyaltyPoints ?? '-',
    },
  ];

  const Data = () => {
    return loyaltyTable.map((item: any) => {
      return (
        <tr>
          <td style={{ paddingRight: 20, paddingTop: 10 }}>
            <b>{`${item.name}`}:</b>
          </td>
          <td>
            <b>{`${item.value}`}</b>
          </td>
        </tr>
      );
    });
  };

  return <>{Data()}</>;
};
export default Loyalty;
