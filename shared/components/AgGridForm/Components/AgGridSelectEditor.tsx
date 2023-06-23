import Select from 'react-select';

interface IAgGridSelectEditor {
  handleChange: any;
  data: any;
  largeWrapper?: boolean;
}

export const AgGridSelectEditor = ({
  handleChange,
  data,
  largeWrapper = false,
}: IAgGridSelectEditor) => {
  return (
    <div
      className={`ag-grid-select-wrapper ${
        largeWrapper ? 'ag-grid-select-wrapper-large' : ''
      }`}
    >
      <Select
        name="ag-grid-select-editor"
        getOptionLabel={(option: any) => option.label}
        getOptionValue={(option: any) => option.value}
        options={data}
        onChange={handleChange}
        className={'select-wrapper'}
        isClearable={true}
        placeholder={'Select'}
        autoFocus
        defaultMenuIsOpen
      />
    </div>
  );
};
