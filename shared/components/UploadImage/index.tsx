import React, { JSXElementConstructor } from 'react';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';

const UplaodImage = ({ params }: any) => {
  return (
    <Field
      type="files"
      label=""
      name="attachmentName"
      value={params?.value}
      defaultValue={params?.value}
      isFullWidth
      onChange={(e: any) => {
        const file = e.target.files[0];
        const input = new FormData();
        input.append('File', file);
        params.data.status = file;
      }}
    />
  );
};
export default UplaodImage;
