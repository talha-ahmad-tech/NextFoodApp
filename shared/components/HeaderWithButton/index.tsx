import { Icon } from "../Icon";


interface IListWrapperMain {
    heading: string;
    addBtnClick?: any;
  }



const HeaderWithButton = ({
    heading,
    addBtnClick = () => {},
  }: IListWrapperMain) => {

    return(
        <div className="header-btn-wrapper">
        <h6>{heading}</h6>
        <button className="no-icon" onClick={addBtnClick}>
          <Icon variant="add" />
        </button>
      </div>
    )
}

export default HeaderWithButton;
