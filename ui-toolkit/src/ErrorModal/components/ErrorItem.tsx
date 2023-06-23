import React from "react"
const ErrorItem = (props: ErrorItemProps) => {
  return (
    <li className="error-content__item">
      <a href="" className="error-content__link">
        {props.label}
      </a>
      <p className="error-content__text">{props.message}</p>
    </li>
  );
};
export default React.memo(ErrorItem);

export type ErrorItemProps = {
  label: string;
  message: string;
};
