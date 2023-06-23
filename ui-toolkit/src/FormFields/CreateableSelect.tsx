import React from 'react';
import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

interface ICreateSelect {
  inputValue?: any;
  value?: any;
  setValue?: any;
  setInputValue?: any;
  handleKeyDown?: any;
  defaultValue?: any;
  handleOptions?: any;
  handleInputChange?: any;
}

const CreateableSelect = ({
  inputValue,
  value,
  handleKeyDown,
  defaultValue,
  handleOptions,
  handleInputChange,
}: ICreateSelect) => {
  return (
    <div className={`ag-grid-select-wrapper`}>
      <CreatableSelect
        components={components}
        className={'select-wrapper'}
        inputValue={inputValue}
        defaultValue={defaultValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={handleOptions}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Create Sub Value.."
        value={value}
      />
    </div>
  );
};
export default CreateableSelect;
