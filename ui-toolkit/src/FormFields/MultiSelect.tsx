import type { ValueContainerProps } from 'react-select';
import { components } from 'react-select';

import Select from './AllSelectRenderer';

interface Props {
  type?: string;
  errorMessage?: string;
  handleChange?: any;
  options: Option[];
  selected: Option[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isFullWidth?: boolean;
  label?: string;
  name?: string;
  linesWrapper?: boolean;
  noLabel?: boolean;
  inputValue?: any;
  defaultInputValue?: any;
  defaultValue?: any;
  componentType?:
    | 'selectall'
    | 'checkbox'
    | 'menulist'
    | 'list'
    | 'listwithcount';
  rest?: any;
}

export type Option = {
  value?: number | string;
  label?: string;
  name?: string;
};

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <span style={{ marginRight: '50px' }}>Name / Description</span>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ValueContainer = ({ children, ...props }: ValueContainerProps<any>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let [values]: any = children || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [input]: any = children;

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IListOption = ({ isSelected, children, innerProps, ...rest }: any) => {
  const props = {
    ...innerProps,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <label>{props?.label}</label>
      </components.Option>
    </div>
  );
};

const allOption = {
  label: 'Select all',
  value: '*',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default function MultiSelect({
  options,
  isFullWidth = false,
  label = '',
  name = '',
  errorMessage = '',
  noLabel = false,
  linesWrapper = false,
  componentType = 'checkbox',
  handleChange,
  selected,
  ...rest
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  return (
    <>
      {linesWrapper ? (
        <div className={`ag-grid-select-wrapper`}>
          <Select
            options={options ?? []}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            onChange={handleChange}
            allowSelectAll={true}
            value={selected}
            allOption={allOption}
            name={name}
            component={component}
            {...rest}
          />
        </div>
      ) : noLabel ? (
        <div className={`ag-grid-select-wrapper`}>
          <Select
            options={options ?? []}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            onChange={handleChange}
            allowSelectAll={true}
            value={selected}
            allOption={allOption}
            name={name}
            component={component}
            {...rest}
          />
          {errorMessage && <p>{errorMessage}</p>}
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
              style={{ width: '55%' }}
              className={` ${
                isFullWidth ? 'col-12' : 'col-12 col-lg-7 col-xxl-9'
              }   ${errorMessage ? 'error-message-wrapper' : ''}`}
            >
              <Select
                options={options ?? []}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={handleChange}
                allowSelectAll={true}
                value={selected}
                allOption={allOption}
                name={name}
                component={component}
                {...rest}
              />
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
