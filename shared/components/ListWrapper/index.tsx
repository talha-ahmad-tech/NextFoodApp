import "./style.scss";

interface IListWrapper {
  title: string;
  id: string;
  time: string;
}
const ListWrapper = ({ title, id, time }: IListWrapper) => {
  return (
    <div className="list-main-wrapper">
      <div className="list-main-wrapper__left">
        <span className="custom-p-13 font-medium d-block">{title}</span>
        <span className="custom-p-13 light-blue-clr d-block">{id}</span>
      </div>
      <div className="list-main-wrapper__right">
        <span className="custom-p-10 light-blue-clr d-block">{time}</span>
      </div>
    </div>
  );
};
export default ListWrapper;
