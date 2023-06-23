// import AsyncSelect from 'react-select/async';
import Select from 'react-select';

import { components, ValueContainerProps } from 'react-select';
import { useEffect, useState } from 'react';

interface AsyncSelectFieldType {
  loadOptions: { [key: string]: string } | any;
  label?: string;
  errorMessage?: string;
  value?: any;
  name?: string;
  onChange: (props?: unknown) => void;
  defaultValue?: any;
  disabled?: boolean;
  clear?: boolean;
  inputValue?: string;
  defaultInputValue?: string;
  linesWrapper?: boolean;
  isSearchable?: boolean;
  id?: string;
  isFullWidth?: boolean;
  largeWrapper?: boolean;
  cacheOptions?: string[];
  isMulti?: boolean;
  isDefaultAsync?: boolean;
  cacheUniqs?: any;
  options?: any;
  key?: any;
  noLabel?: boolean;
  componentType?:
    | 'selectall'
    | 'checkbox'
    | 'menulist'
    | 'list'
    | 'listwithcount';
  isOptionSelected?: any;
}

const allOption = {
  label: 'Select all',
  value: '*',
};
const MultiValue = (props: any) => {
  let labelToBeDisplayed = `${props?.data?.label}, `;
  if (props?.data?.value === allOption?.value) {
    labelToBeDisplayed = 'All is selected';
  }
  return (
    <components.MultiValue {...props}>
      <span>{labelToBeDisplayed}</span>
    </components.MultiValue>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InputOption = ({ isSelected, children, innerProps, ...rest }: any) => {
  const props = {
    ...innerProps,
  };

  return (
    <components.Option {...rest} isSelected={isSelected} innerProps={props} sel>
      <input type="checkbox" checked={isSelected} />
      {children}
    </components.Option>
  );
};
const IMenuOption = ({ isSelected, children, innerProps, ...rest }: any) => {
  const props = {
    ...innerProps,
  };

  const menuHeaderStyle = {
    padding: '8px 12px',
    background: '#E5E4E2',
    color: 'gray',
  };
  return (
    <>
      <div style={menuHeaderStyle}>
        <span style={{ marginRight: '60px' }}>ID</span>
        <span style={{ marginRight: '50px' }}>Name</span>
        <span>Description</span>
      </div>
      <components.MenuList
        {...props}
        {...rest}
        isSelected={isSelected}
        innerProps={props}
      >
        <>{children}</>
      </components.MenuList>
    </>
  );
};

const ValueContainer = ({ children, ...props }: ValueContainerProps<any>) => {
  let [values, input] = children as any;

  if (Array.isArray(values)) {
    const val = (i: number) => values[i].props.children;
    const { length } = values;

    switch (length) {
      case 1:
        values = `${val(0)}`;
        break;
      case 2:
        values = `${val(0)} and ${val(1)}`;
        break;
      case 3:
        values = `${val(0)}, ${val(1)} and ${val(2)}`;
        break;
      default:
        const plural = values.length === 3 + 1 ? '' : 's';
        const otherCount = length - 3;
        values = `${val(0)}, ${val(1)}, ${val(2)} +${otherCount}`;
        break;
    }
  }
  return (
    <components.ValueContainer {...props}>
      {values}
      {input}
    </components.ValueContainer>
  );
};

const IListOption = ({ isSelected, children, innerProps, ...rest }: any) => {
  const props = {
    ...innerProps,
  };

  const menuHeaderStyle = {
    padding: '8px 12px',
    background: '#E5E4E2',
    color: 'gray',
  };
  return (
    <>
      <components.MenuList
        {...props}
        {...rest}
        isSelected={isSelected}
        innerProps={props}
      >
        <>{children}</>
      </components.MenuList>
    </>
  );
};
const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <label>{props?.label}</label>
      </components.Option>
    </div>
  );
};
const AsyncMultiCheckbox = ({
  loadOptions,
  label,
  errorMessage,
  value,
  onChange,
  name = '',
  defaultValue,
  disabled = false,
  clear = true,
  defaultInputValue = '',
  linesWrapper = false,
  isSearchable = false,
  id = 'multicheckbox',
  isFullWidth = false,
  cacheOptions = [],
  isMulti = false,
  inputValue,
  isDefaultAsync = false,
  options = [],
  key,
  componentType = 'checkbox',
  noLabel = false,
  isOptionSelected,
}: AsyncSelectFieldType) => {
  const [vals, setVals] = useState([]);
  const component =
    componentType === 'selectall'
      ? { Option, MultiValue }
      : componentType === 'listwithcount'
      ? { ValueContainer: ValueContainer }
      : componentType === 'checkbox'
      ? {
          Option: InputOption,
        }
      : componentType === 'list'
      ? { MenuList: IListOption }
      : {
          MenuList: IMenuOption,
        };

  // useEffect(() => {
  //   Promise.resolve(loadOptions()).then((values: any) => {
  //     setVals(values);
  //   });
  // }, []);

  return (
    <>
      {linesWrapper ? (
        <div className={`ag-grid-select-wrapper`}>
          <Select
            name={name}
            id={id}
            value={value}
            defaultInputValue={defaultInputValue}
            isDisabled={disabled}
            className={'select-wrapper'}
            defaultValue={defaultValue}
            getOptionValue={(option: any) => option.value}
            getOptionLabel={(option: any) => option.label}
            closeMenuOnSelect={false}
            closeMenuOnScroll={false}
            hideSelectedOptions={false}
            // loadOptions={loadOptions}
            options={options}
            onChange={onChange}
            // defaultOptions
            isMulti={isMulti}
            isSearchable={isSearchable}
            components={component}
            // cacheOptions={cacheOptions}
            isClearable={clear}
            inputValue={inputValue}
            key={key}
            isOptionSelected={isOptionSelected}
          />
        </div>
      ) : noLabel ? (
        <div className={`ag-grid-select-wrapper`}>
          <Select
            name={name}
            id={id}
            value={value}
            defaultInputValue={defaultInputValue}
            isDisabled={disabled}
            className={'select-wrapper'}
            defaultValue={defaultValue}
            getOptionValue={(option: any) => option.value}
            getOptionLabel={(option: any) => option.label}
            closeMenuOnSelect={false}
            closeMenuOnScroll={false}
            hideSelectedOptions={false}
            // loadOptions={loadOptions}
            options={options}
            onChange={onChange}
            // defaultOptions
            isMulti
            components={component}
            // cacheOptions={cacheOptions}
            isClearable={clear}
            inputValue={inputValue}
            isOptionSelected={isOptionSelected}
          />
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      ) : isDefaultAsync ? (
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
              <Select
                name={name}
                id={id}
                defaultInputValue={defaultInputValue}
                isDisabled={disabled}
                className={'select-wrapper'}
                getOptionValue={(option: any) => option.value}
                getOptionLabel={(option: any) => option.label}
                // loadOptions={loadOptions}
                options={options}
                onChange={onChange}
                inputValue={inputValue}
                // defaultOptions
                // cacheOptions={cacheOptions}
                isClearable={false}
                defaultValue={defaultValue}
                isOptionSelected={isOptionSelected}
              />
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
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
              <Select
                name={name}
                id={id}
                value={value}
                defaultInputValue={defaultInputValue}
                isDisabled={disabled}
                className={'select-wrapper'}
                defaultValue={defaultValue}
                getOptionValue={(option: any) => option.value}
                getOptionLabel={(option: any) => option.label}
                closeMenuOnSelect={false}
                closeMenuOnScroll={false}
                hideSelectedOptions={false}
                // loadOptions={(ser: any) => {
                //   console.log('pro::', loadOptions());

                //   return loadOptions(ser);
                // }}
                options={[allOption, ...options]}
                onChange={(selected: any, event: { action?: string }) => {
                  console.log('ops::', selected, event);

                  if (selected !== null && selected?.length > 0) {
                    if (
                      selected[selected?.length - 1]?.value === allOption?.value
                    ) {
                      return onChange([allOption, ...options]);
                    }
                    let result = [];
                    if (selected?.length === options?.length) {
                      if (selected?.includes(allOption)) {
                        result = selected?.filter(
                          (option: { value?: string }) =>
                            option?.value !== allOption?.value,
                        );
                      } else if (event?.action === 'select-option') {
                        result = [...options];
                      }
                      return onChange(result);
                    }
                  }

                  return onChange(selected);
                }}
                // defaultOptions
                isMulti
                components={component}
                // cacheOptions={cacheOptions}
                isClearable={clear}
                inputValue={inputValue}
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
export default AsyncMultiCheckbox;
