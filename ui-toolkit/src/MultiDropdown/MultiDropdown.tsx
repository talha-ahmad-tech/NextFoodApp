import React from "react";

import { MultiSelect } from "react-multi-select-component";
import "./MultiDropdown.scss";

const MultiDropdown = (props: MultiSelectProps) => {
  const { options, value, onValueChange } = props;
  const handleChange = (res: any) => {
    onValueChange(res);
  };

  return (
    <div>
      <MultiSelect
        options={options}
        value={value}
        onChange={handleChange}
        labelledBy="Select"
      />
    </div>
  );
};
export type MultiSelectProps = {
  options: any;
  value: any;
  onValueChange: any;
};
export default React.memo(MultiDropdown);
