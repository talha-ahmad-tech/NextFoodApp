import { Icon } from '../Icon';

interface IListWrapperMain {
  heading: string;
  addBtnClick?: any;
}

const HeaderTextButton = ({
  heading,
  addBtnClick = () => {},
}: IListWrapperMain) => {
  return (
    <div className="custom-flex-between">
      <h5 className="font-medium mb-2">{heading}</h5>
      <div className="custom-flex">
        <button className="pe-2">
          <Icon variant="filter" />
        </button>
        <button className="ps-3">
          <Icon variant="setting" />
        </button>
      </div>
    </div>
  );
};

export default HeaderTextButton;
