interface InputType {
  label: string;
  errorMessage: string;
  name: string;
  value: string;
  onChange: () => void;
  onBlur: () => void;
  disabled: boolean;
  type: string;
  readOnly?: boolean;
  defaultValue?: string;
  placeholder?: string;
  isFullWidth?: boolean;
  title?: string;
  isOptional?: boolean;
  customClass?: any;
  ref?: any;
  sign?: string;
  inputMaxWidth?: boolean;
  customlabel?: boolean;
  accept?: string;
  negativeMargin?: boolean;
  marginRight?: boolean;
}

const Input = ({
  label = '',
  ref = null,
  type = 'text',
  errorMessage = '',
  name = '',
  value = '',
  onChange,
  onBlur,
  disabled = false,
  readOnly = false,
  defaultValue,
  placeholder = '',
  isFullWidth = false,
  title = '',
  isOptional = false,
  sign = '%',
  customClass,
  inputMaxWidth = false,
  customlabel = false,
  accept = '',
  negativeMargin = false,
  marginRight = false,
  ...rest
}: Partial<InputType>) => {
  return (
    <div
      className={`form-group ${
        isFullWidth
          ? 'm-0 full-width-wrapper'
          : Boolean(customClass)
          ? customClass
          : ''
      }`}
    >
      <div
        className={`row ${negativeMargin ? 'input-margin-right-negative' : ''}`}
      >
        {!isFullWidth && !title ? (
          <div className="col-12  col-lg-5 col-xxl-3">
            <label
              className={`col-form-label form-label-required ${
                customlabel && 'custom-label'
              }`}
            >
              {label}
              <sup>{isOptional ? null : '*'}</sup>
            </label>
          </div>
        ) : null}

        <div
          className={` col-12 ${isFullWidth ? '' : 'col-lg-7 col-xxl-9'} ${
            errorMessage ? 'error-message-wrapper' : ''
          }`}
        >
          {title && (
            <div className="col-12 col-form-label col-12 col-lg-5 col-xxl-3"></div>
          )}
          <div
            className={
              marginRight
                ? `friday-input-container-margin`
                : `friday-input-container ${
                    inputMaxWidth ? 'inputMaxWidth' : ''
                  }`
            }
          >
            {type === 'file' ? (
              <input
                ref={ref}
                accept={accept ? accept : 'image/*'}
                className="form-control"
                type={'file'}
                onChange={onChange}
              />
            ) : disabled ? (
              <span className="form-control border-0 font-weight-bold">
                {value}
              </span>
            ) : (
              <input
                ref={ref}
                type={type}
                onBlur={onBlur}
                name={name}
                value={value}
                onChange={onChange}
                className="form-control"
                disabled={disabled}
                readOnly={readOnly}
                defaultValue={defaultValue}
                placeholder={placeholder}
                {...rest}
              />
            )}
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
