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
}

const Input = ({
  label = '',
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
  ...rest
}: Partial<InputType>) => {
  return (
    <div className="form-group">
      <div className="row">
        <div className="col-12  col-lg-5 col-xxl-3">
          <label className="col-form-label form-label-required">{label}</label>
        </div>
        <div
          className={` col-12  col-lg-7 col-xxl-9 ${
            errorMessage ? 'error-message-wrapper' : ''
          }`}
        >
          <div className="friday-input-container">
            <textarea
              rows={4}
              cols={50}
              style={{ height: '90px' }}
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
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
