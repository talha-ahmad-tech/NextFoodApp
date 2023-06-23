import TextInput from "../TextInput/TextInput";
import MultiDropdown from "../MultiDropdown/MultiDropdown";
import SingleDropdown from "../SingleDropdown/SingleDropdown";
import FileInput from "../FileInput/FileInput";
import React from "react";

const FormInput = (props: any) => {
  return (
    <div className="form-group">
      <div className="row">
        <label className="col-lg-5 col-md-6 col-xxl-5 col-form-label">
          {props.label}
        </label>
        <div className="col-lg-7 col-md-6 col-xxl-7">
          <div className="friday-input-container">
            {props.type !== "select" && props.type !== "file" && (
              <TextInput {...props} />
            )}
            {props.multi == true && props.type == "select" && (
              <MultiDropdown {...props} />
            )}
            {props.multi == false && props.type == "select" && (
              <SingleDropdown {...props} />
            )}
            {props.type == "file" && <FileInput {...props} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FormInput);
