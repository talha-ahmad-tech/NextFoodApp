import { useEffect, useRef, useState } from 'react';
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
  formInput?: boolean;
}
const customStyles = {
  container: (provided: any) => ({
    ...provided,
    width: 270,
  }),
};
const CustomAsyncSelectField = ({
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
  formInput = false,
}: AsyncSelectFieldType) => {
  const selectRef: any = useRef();

  const [menuIsOpen, setMenuIsOpen] = useState<any | undefined>();
  const [menuWidth, setMenuWidth] = useState();
  const [isCalculatingWidth, setIsCalculatingWidth] = useState(false);
  useEffect(() => {
    if (!menuWidth && !isCalculatingWidth) {
      setTimeout(() => {
        setIsCalculatingWidth(true);
        selectRef?.current.openMenu();
        setMenuIsOpen(true);
      }, 1);
    }
  }, [menuWidth, isCalculatingWidth]);

  const onMenuOpen = () => {
    if (!menuWidth && isCalculatingWidth) {
      setTimeout(() => {
        const width =
          selectRef?.current?.menuListRef.getBoundingClientRect().width;
        setMenuWidth(width);
        setIsCalculatingWidth(false);
        selectRef?.current?.onMenuClose();
        setMenuIsOpen(false);
      }, 1);
    }
  };

  const styles = {
    menu: (css: any) => ({
      ...css,
      width: `max-content`,
      ...(isCalculatingWidth && { height: 0, visibility: 'hidden' }),
    }),
    control: (css: any) => ({ ...css, display: 'inline-flex ' }),
    valueContainer: (css: any) => ({
      ...css,
      width: formInput ? '285px' : '185px',
    }),
  };

  return (
    <>
      {linesWrapper ? (
        <div className={`ag-grid-select-wrapper`}>
          <AsyncPaginate
            selectRef={selectRef}
            styles={styles}
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
            menuIsOpen={true}
            onMenuOpen={onMenuOpen}
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
                selectRef={selectRef}
                styles={styles}
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
                isSearchable={isSearchable}
                getOptionValue={(option: any) => option.value}
                getOptionLabel={(option: any) => option.label}
                menuIsOpen={menuIsOpen}
                onMenuOpen={onMenuOpen}
              />
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CustomAsyncSelectField;
