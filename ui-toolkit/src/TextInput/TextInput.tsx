import React from "react";
const TextInput = (props: TextInputProps) => {
  const { id, value, classes, type, required, placeholder, onValueChange } =
    props;
  const handleChange = (event: any) => {
    onValueChange(event.target.value);
  };
  return (
    <input
      id={id}
      type={type}
      value={value}
      className={classes}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
    />
  );
};

export type TextInputProps = {
  id: string;
  type: string;
  value: string;
  classes: string;
  onValueChange: any;
  placeholder: string;
  required: boolean;
};

export default React.memo(TextInput);
