/* eslint-disable @typescript-eslint/no-explicit-any */
import SwitchButton from '@fridayfood/ui-toolkit/src/FormFields/SwitchButton';

const ModifierSwitch = (
  params?: any,
  setHide?: any,
  setShow?: any,
  setActiveIndex?: any,
) => {
  return (
    <div className="custom-center-toggle">
      <SwitchButton
        label={''}
        errorMessage={''}
        value={params.value}
        defaultChecked={params.value}
        onChange={(e: { target: { checked: boolean } }) => {
          const colId = params?.colDef?.field;
          params.data[colId] = e?.target?.checked;
          params.data.status = e?.target?.checked;
          if (colId === 'nested' && e?.target?.checked === true) {
            setHide(false);
            setShow(true);
            setActiveIndex(params?.rowIndex);
          } else if (colId === 'nested' && e?.target?.checked === false) {
            setHide(true);
            setShow(false);
          }
        }}
        isFullWidth
      />
    </div>
  );
};

export default ModifierSwitch;
