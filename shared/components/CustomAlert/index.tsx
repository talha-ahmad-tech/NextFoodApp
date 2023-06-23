import React from "react";

interface alertProps {
  title: string;
  className: string;
}

const CustomAlert = ({ title, className }: alertProps) => {
  return (
    <div className={className} role="alert">
      {title}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default CustomAlert;
