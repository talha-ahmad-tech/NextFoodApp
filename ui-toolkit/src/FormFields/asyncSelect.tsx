import { AsyncPaginate } from 'react-select-async-paginate';

interface AsyncSelectFieldType {
  loadOptions: any;
  label: string;
  errorMessage: string;
  value: any;
  name: string;
  cacheUniqs: any;
  onChange: () => {};
  isMulti: boolean;
  reduceOptions?: any;
  defaultValue?: any;
  disabled?: boolean;
  clear?: boolean;
  inputValue?: any;
  options?: any;
  defaultInputValue?: any;
  linesWrapper?: boolean;
  components?: any;
  isSearchable?: boolean;
  id?: string;
  debounceTimeout?: any;
  isFullWidth?: boolean;
  largeWrapper?: boolean;
  additional?: any;
  defaultOptions?: boolean;
}
const customStyles = {
  container: (provided: any) => ({
    ...provided,
    width: 270,
  }),
};
const AsyncSelectField = ({
  loadOptions,
  label,
  errorMessage,
  value,
  onChange,
  name = '',
  cacheUniqs,
  isMulti = false,
  reduceOptions,
  defaultValue,
  disabled = false,
  clear = false,
  options,
  inputValue = '',
  defaultInputValue,
  linesWrapper = false,
  components,
  isSearchable = true,
  id = '',
  debounceTimeout,
  isFullWidth = false,
  largeWrapper = false,
  additional,
  defaultOptions = false,
}: AsyncSelectFieldType) => {
  return (
    <>
      {linesWrapper ? (
        <div className={`ag-grid-select-wrapper`}>
          <AsyncPaginate
            id={id}
            name={name}
            value={value}
            loadOptions={loadOptions}
            reduceOptions={reduceOptions}
            cacheUniqs={cacheUniqs}
            isMulti={isMulti}
            onChange={onChange}
            className={'select-wrapper'}
            defaultValue={defaultValue}
            isDisabled={disabled}
            isClearable={clear}
            options={options}
            inputValue={inputValue}
            defaultInputValue={defaultInputValue}
            components={components}
            isSearchable={isSearchable}
            getOptionValue={(option: any) => option.value}
            getOptionLabel={(option: any) => option.label}
            additional={additional}
            defaultOptions={defaultOptions}
          />
        </div>
      ) : (
        <div className="form-group">
          <div className="row">
            <label
              className={`${
                isFullWidth
                  ? 'col-12 col-form-label'
                  : 'col-12 col-form-label col-lg-5 col-xxl-3'
              }`}
            >
              {label}
            </label>

            <div
              className={` ${
                isFullWidth ? 'col-12' : 'col-12 col-lg-7 col-xxl-9'
              }   ${errorMessage ? 'error-message-wrapper' : ''}`}
            >
              <AsyncPaginate
                id={id}
                name={name}
                value={value}
                loadOptions={loadOptions}
                reduceOptions={reduceOptions}
                cacheUniqs={cacheUniqs}
                isMulti={isMulti}
                onChange={onChange}
                className={'select-wrapper'}
                isDisabled={disabled}
                isClearable={clear}
                options={options}
                inputValue={inputValue}
                defaultInputValue={defaultInputValue}
                defaultValue={defaultValue}
                getOptionValue={(option: any) => option.value}
                getOptionLabel={(option: any) => option.label}
                additional={additional}
                defaultOptions={defaultOptions}
              />
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AsyncSelectField;
