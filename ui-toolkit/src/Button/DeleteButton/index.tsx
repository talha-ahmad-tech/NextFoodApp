import { useState, memo } from 'react';
import ToolTip from 'react-portal-tooltip';
import '../Button.scss';

const DeleteButton = (props: any) => {
  const { classes, type = 'button', onClick, id } = props;
  const clickHandler = () => {
    onClick();
  };
  const handleHideShow = () => {
    props.toggleMenu(props.id);
  };
  const [isTooltipActive, setisTooltipActive] = useState(false);
  const showTooltip = () => {
    setisTooltipActive(true);
  };
  const hideTooltip = () => {
    setisTooltipActive(false);
  };

  return (
    <>
      <button
        className={classes}
        type={type}
        onClick={clickHandler}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        id="delete"
      >
        <i className="fas fa-trash"></i>
      </button>
      <ToolTip
        active={isTooltipActive}
        position="top"
        arrow="center"
        parent="#delete"
      >
        Delete
      </ToolTip>
    </>
  );
};

export default memo(DeleteButton);
