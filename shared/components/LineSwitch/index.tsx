import SwitchButton from '@fridayfood/ui-toolkit/src/FormFields/SwitchButton';
import React from 'react';
const LineSwitch = (params: any) => {
  return (
    <div className="custom-center-toggle">
      <SwitchButton
        label={''}
        errorMessage={''} 
        value={params.value}
        defaultChecked={params.value}
        onChange={(e: any) => {
          const colId = params?.colDef?.field;
          params.data[colId] = e?.target?.checked;
          params.data.status = e?.target?.checked;
        }}
        onBlur={undefined}
        name={''}
        isFullWidth
      />
    </div>
  );
};

export default LineSwitch;
