import moment from "moment";
const amountFormatter = (value: any) => {
  let intlFormat = new Intl.NumberFormat("en-US");
  const formatted = intlFormat.format(Number(value));
  return formatted;
  // value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
};

export const dateFormatter = (value: string) => {
  return value ? new Date(value).toLocaleDateString() : "";
};
export const timeFormatter = (value: string) => {
  return value ? moment(value).format("LT") : "";
};

export default amountFormatter;
