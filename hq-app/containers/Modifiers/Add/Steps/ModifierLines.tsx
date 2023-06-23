import {
  AgGridForm,
  ProductsContext,
  ProductsDispatchContext,
} from '@fridayfood/shared/components';
import { useModifier } from '../Steps/useModifier';
import ModalCustom from '@fridayfood/ui-toolkit/src/Modal';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import {
  useState,
  KeyboardEventHandler,
  useContext,
  useEffect,
  SetStateAction,
} from 'react';
import { ActiveIndexContext } from '@fridayfood/shared/components/Context/ProductsContext';

interface Option {
  readonly label: string;
  readonly value: string;
}
const createOption = (label: string) => ({
  label,
  value: label,
});

const ModifierLines = () => {
  const { CustomCellEditorParams, onCellValueChanged, gridRef, columnDefs } =
    useModifier();
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<readonly Option[]>([]);

  const lines = useContext(ProductsContext);
  const setLines = useContext(ProductsDispatchContext);
  const { activeIndex, setActiveIndex } = useContext(ActiveIndexContext);

  useEffect(() => {
    if (value.length) {
      const prevSubLines = [...lines?.subValues];
      prevSubLines[activeIndex] = value;
      setLines({ ...lines, subValues: prevSubLines });
    }
  }, [value]);

  const cols = [...columnDefs(CustomCellEditorParams, setShow)];

  const handleKeyDown: KeyboardEventHandler = event => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue(prev => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
    }
  };

  const handleConfirm = () => {
    setShow(false);
    setValue([]);
    setInputValue('');
    setActiveIndex(-1);
  };

  const onRowSelect = (event: {
    rowIndex: string | number;
    node: { selected: boolean };
  }) => {
    lines.detailsLines[event?.rowIndex].isChecked = event?.node?.selected;
  };

  return (
    <div>
      <AgGridForm
        ref={gridRef}
        columnDefs={cols}
        rowData={lines?.detailsLines}
        onCellValueChanged={onCellValueChanged}
        onRowSelected={onRowSelect}
      />
      <ModalCustom
        show={show}
        title={'Add Sub Values'}
        close={() => setShow(false)}
        handleConfirm={handleConfirm}
        customClass
        hideFooter
        customFooter
        modalWidth="custom-small-modal"
        saveButtonType="button"
      >
        <div className="d-flex justify-content-center">
          <div style={{ width: 350 }}>
            <Field
              type="createable"
              value={value}
              inputValue={inputValue}
              handleOptions={(value: React.SetStateAction<readonly Option[]>) =>
                setValue(value)
              }
              onInputChange={(newValue: SetStateAction<string>) =>
                setInputValue(newValue)
              }
              handleInputChange={(value: React.SetStateAction<string>) =>
                setInputValue(value)
              }
              handleKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </ModalCustom>
    </div>
  );
};

export default ModifierLines;
