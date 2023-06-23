import React, { useState } from 'react';
import { SwitchButton } from '@fridayfood/ui-toolkit';
const CustomSwitchRenderer = (params: any, disable: boolean) => {
  const [toggleSwitch, setToggleSwitch] = useState<any>();

  return (
    <div className="custom-center-toggle">
      <SwitchButton
        label={''}
        errorMessage={''}
        value={params.value}
        isDisabled={disable}
        defaultChecked={params.value}
        onChange={(e: any) => {
          params.data.status = e.target.checked;
        }}
        onBlur={undefined}
        name={''}
        isFullWidth
      />
    </div>
  );
};

export default CustomSwitchRenderer;
