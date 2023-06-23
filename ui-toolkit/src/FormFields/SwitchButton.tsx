import React from 'react';

interface ToggleButtonType {
  label: string;
  errorMessage: string;
  value: any;
  onChange: any;
  onBlur?: any;
  name? : string;
  checked?: boolean;
  defaultValue?: any;
  defaultChecked?: any;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isHalfWidth?: boolean;
  customClass?: boolean;
}

const SwitchButton = ({
  label,
  onChange,
  value,
  errorMessage,
  name,
  checked,
  defaultValue,
  defaultChecked,
  isDisabled,
  isFullWidth,
  isHalfWidth,
  customClass,
}: ToggleButtonType) => {
  const reservedClass = isFullWidth
    ? ''
    : isHalfWidth
    ? 'col-lg-6'
    : 'col-lg-7 col-xxl-9';
  return (
    <div className={`form-group switch-button  ${isFullWidth ? 'm-0' : ''}`}>
      <div className="row">
        {isFullWidth ? null : (
          <div
            className={` ${
              isHalfWidth ? 'col-12  col-lg-6' : 'col-12  col-lg-5 col-xxl-3 '
            }`}
          >
            <label className=" col-form-label form-label-required">
              {label}
            </label>
          </div>
        )}
        <div className={`col-12  ${reservedClass}`}>
          <div
            className={`form-check form-switch p-0 m-0 d-flex align-items-start ${
              customClass ? 'justify-content-center' : 'justify-content-start'
            } ${
              errorMessage ? 'error-message-wrapper flex-column' : ''
            }`}
          >
            <input
              className="form-check-input"
              type="checkbox"
              id={name}
              onChange={onChange}
              value={value}
              checked={checked}
              defaultChecked={defaultChecked}
              defaultValue={defaultValue}
              disabled={isDisabled}
            />
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchButton;
