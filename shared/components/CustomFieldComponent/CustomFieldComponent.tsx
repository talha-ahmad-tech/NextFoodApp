import { Controller } from 'react-hook-form';

import React from 'react';
import { Field } from '@fridayfood/ui-toolkit';

const CustomFieldComponent = (props: any) => {
  const { control, name, type = 'date', ...others } = props || {};

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={others?.inputValue}
      render={({ field: { ...rest } }) => (
        <Field type={type} {...rest} {...others} />
      )}
    />
  );
};

export default CustomFieldComponent;
