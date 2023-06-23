import "./styles.scss";
import HeaderTextButton from "../HeaderTextButton";
interface IChartsWrapper {
  heading: string;
  children: any
}
const ChartsWrapper = ({ heading, children }: IChartsWrapper) => {
  return (
    <div className="custom-card-wrapper charts-wrapper">
      <HeaderTextButton heading={heading} />
      <div className="card-wrapper-inner-list">{children}</div>
    </div>
  );
};
export default ChartsWrapper;
