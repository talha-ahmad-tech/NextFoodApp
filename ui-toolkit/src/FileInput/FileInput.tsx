import React from "react";
import "./FileInput.scss";

const FileInput = (props: any) => {
  const handleFileUplaod = (event: any) => {
  
  };

  const getFile = (filePath: any) => {
    return filePath.substr(filePath.lastIndexOf("\\") + 1).split(".")[0];
  };

  return (
    // <input type="file" id="myfile" name="myfile"></input>
    <form>
      <div className="file-upload-wrapper" data-text="No File Choosen">
        <input
          id="file-upload-field"
          name="file-upload-field"
          type="file"
          className="file-upload-field"
          onChange={handleFileUplaod}
        />
      </div>
      <p>Only Jpej, PNG, PDF, ppt</p>
    </form>
  );
};

export default React.memo(FileInput);
