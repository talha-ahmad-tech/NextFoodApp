import React from "react";

import Select from "react-select";
import "./SingleDropdown.scss";

const SingleDropdown = (props: SingleDropdownProps) => {
  const { options, value, onValueChange } = props;
  const handleChange = (event: any) => {
    onValueChange(event);
  };
  return (
    <div>
      <Select
        name="example"
        options={options}
        value={value}
        isMulti={false}
        onChange={handleChange}
      />
    </div>
  );
};

export type SingleDropdownProps = {
  options: any;
  value: any;
  onValueChange: any;
};

export default React.memo(SingleDropdown);
