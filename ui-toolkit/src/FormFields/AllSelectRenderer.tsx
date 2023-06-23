import React from 'react';
import { default as ReactSelect } from 'react-select';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AllSelect = (props: any) => {
  return (
    <>
      {props?.allowSelectAll ? (
        <ReactSelect
          {...props}
          options={[props?.allOption, ...props?.options]}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(selected: any, event: { action?: string }) => {
            if (selected !== null && selected?.length > 0) {
              if (
                selected[selected?.length - 1]?.value ===
                props?.allOption?.value
              ) {
                return props?.onChange([props?.allOption, ...props?.options]);
              }
              let result = [];
              if (selected?.length === props?.options?.length) {
                if (selected?.includes(props?.allOption)) {
                  result = selected?.filter(
                    (option: { value?: string }) =>
                      option?.value !== props?.allOption?.value,
                  );
                } else if (event?.action === 'select-option') {
                  result = [...props?.options];
                }
                return props?.onChange(result);
              }
            }

            return props?.onChange(selected);
          }}
          components={props?.component}
        />
      ) : (
        <ReactSelect {...props} components={props?.component} />
      )}
    </>
  );
};

export default AllSelect;
