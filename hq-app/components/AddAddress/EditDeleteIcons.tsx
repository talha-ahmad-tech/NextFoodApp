import { EditButton, DeleteButton } from '@fridayfood/ui-toolkit';
import React from 'react';

type EditDeleteIconsTypes = {
  data: {
    editFunction: () => 0;
    deleteFunction: () => 0;
  };
};
const EditDeleteIcons = (props: EditDeleteIconsTypes) => {
  return (
    <div className="d-flex align-items-center justify-content-start">
      <EditButton
        classes={`custom-icon-button`}
        onClick={props?.data?.editFunction}
      />
      <DeleteButton
        classes={`custom-icon-button`}
        onClick={props?.data?.deleteFunction}
      />
    </div>
  );
};
export default EditDeleteIcons;
