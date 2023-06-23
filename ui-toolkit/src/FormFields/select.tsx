import Select from 'react-select';

interface SelectFieldType {
  options: { name: string; value: string }[] | undefined;
  value: { name: string; value: string } | undefined;
  onChange: (e: any) => void | undefined;
  name: string;
  errorMessage: any;
  label?: string;
  title?: string;
  onBlur: () => void;
  defaultValue?: { name: string; value: string }[] | undefined;
  isMulti?: boolean;
  disabled?: boolean;
  clear?: boolean;
  isFullWidth?: boolean;
  placeholder?: string;
  type?: string;
  defaultInputValue?: string;
  components?: any;
  closeMenuOnSelect?: boolean;
  hideSelectedOptions?: boolean;
  customClass?: any;
  linesWrapper?: boolean;
  inputValue?: any;
  isOptionSelected?: any;
}

const SelectField = ({
  options = [],
  value = undefined,
  name = '',
  onChange,
  errorMessage = undefined,
  label = '',
  onBlur,
  isMulti = false,
  disabled = false,
  isFullWidth = false,
  title = '',
  clear = false,
  customClass,
  placeholder = 'Select...',
  type = '',
  defaultValue,
  defaultInputValue,
  components,
  closeMenuOnSelect = false,
  hideSelectedOptions = false,
  inputValue = '',
  linesWrapper = false,
  isOptionSelected,
}: Partial<SelectFieldType>) => {
  let selectedValue = options?.find((option: any) => option?.value === value);
  return (
    <>
      {linesWrapper ? (
        <div className="ag-grid-select-wrapper">
          <Select
            name={name}
            value={selectedValue}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.value}
            options={options}
            backspaceRemovesValue={true}
            onChange={onChange}
            className={'select-wrapper'}
            onBlur={onBlur}
            isMulti={isMulti}
            isDisabled={disabled}
            isClearable={clear}
            placeholder={placeholder}
            defaultValue={defaultValue}
            defaultInputValue={defaultInputValue}
            components={components}
            closeMenuOnSelect={closeMenuOnSelect}
            hideSelectedOptions={hideSelectedOptions}
            isOptionSelected={isOptionSelected}
          />
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      ) : (
        <div
          className={`form-group ${
            isFullWidth
              ? 'm-0 full-width-wrapper'
              : Boolean(customClass)
              ? customClass
              : ''
          }`}
        >
          <div className="row">
            {label && !title && (
              <label
                className={` col-12 col-form-label  ${
                  isFullWidth ? '' : 'col-12 col-lg-5 col-xxl-3'
                } `}
              >
                {label}
              </label>
            )}

            <div
              className={` col-12 ${isFullWidth ? '' : 'col-lg-7 col-xxl-9'} ${
                errorMessage ? 'error-message-wrapper' : ''
              }`}
            >
              {title && (
                <label
                  className={` col-12 col-form-label  ${
                    isFullWidth ? '' : 'col-12 col-lg-5 col-xxl-3'
                  } `}
                >
                  {title}
                </label>
              )}

              <Select
                name={name}
                value={selectedValue}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.value}
                options={options}
                backspaceRemovesValue={true}
                onChange={onChange}
                className={'select-wrapper'}
                onBlur={onBlur}
                isMulti={isMulti}
                isDisabled={disabled}
                isClearable={clear}
                placeholder={placeholder}
                defaultValue={defaultValue}
                defaultInputValue={defaultInputValue}
                components={components}
                closeMenuOnSelect={closeMenuOnSelect}
                hideSelectedOptions={hideSelectedOptions}
                isOptionSelected={isOptionSelected}
              />
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SelectField;
