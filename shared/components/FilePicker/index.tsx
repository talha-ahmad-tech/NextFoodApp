import React from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['XLSX'];

type FilePickerProps = {
  onFilePick?: (file: File) => void;
};

const FilePicker = ({ onFilePick }: FilePickerProps) => {
  return (
    <FileUploader
      multiple={false}
      classes={'h-50'}
      handleChange={onFilePick}
      name="file"
      types={fileTypes}
    />
  );
};

export default FilePicker;
