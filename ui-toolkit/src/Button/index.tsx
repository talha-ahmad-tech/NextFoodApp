import React from "react";
// import "./Button.scss";

const Button = (props: any) => {
  const {
    classes,
    label,
    toggle,
    target,
    type,
    onClick,
    id,
    style = {},
  } = props;
  const clickHandler = () => {
    onClick();
  };
  if (toggle) {
    return (
      <button
        className={classes}
        id={id}
        data-bs-toggle={toggle}
        data-bs-target={target}
        type="button"
      >
        {label}
      </button>
    );
  }
  return (
    <button
      className={classes}
      type={type}
      onClick={clickHandler}
      style={style}
    >
      {label}
    </button>
  );
};

export default React.memo(Button);
