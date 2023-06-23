import CustomDropdown from '../CustomDropdown';
import Hamberg from '../Svgs/Hamberg';
import ArrowUp from '../Svgs/ArrowUp';

import './style.scss';

const tableactions = [{ name: 'Edit' }, { name: 'Remove' }];
const CardHeaderIConText = (props: any) => {
  return (
    <div
      className={`${
        props.nodropdown
          ? 'custom-flex-start justify-content-between'
          : 'custom-flex-start'
      }`}
    >
      <div className="icon-wrapper large-wrapper">{props.icon}</div>
      {props.nodropdown ? (
        <div className="d-flex align-items-end justify-content-end flex-column">
          {props.arrowDown ? (
            <div className="arrow-down">
              <ArrowUp />
            </div>
          ) : (
            <ArrowUp />
          )}
          <p className="font-medium custom-p-16 pt-1">
            {props.percentageammount} %
          </p>
        </div>
      ) : (
        <div>
          <div className="ms-3">
            <h6 className="font-medium custom-title-card">{props.title}</h6>
            <p className="custom-p-14 light-blue-clr">{props.pagelisting}</p>
          </div>
          <div className="custom-dropdown-wrapper-cards">
            <CustomDropdown
              className="custom-grey-outline-btn no-icon"
              items={tableactions}
              icon={<Hamberg />}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default CardHeaderIConText;
