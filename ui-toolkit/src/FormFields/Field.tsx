import AsyncSelectField from './asyncSelect';
import AsyncSelectFieldWithPagination from './asyncSelectWithPagination';
import CustomAsyncSelectField from './customAsyncMenu';
import Input from './input';
import InputFile from './inputFile';
import SelectField from './select';
import SwitchButton from './SwitchButton';
import TextArea from './textarea';
import AsyncMultiCheckbox from './AsyncMultiCheckbox';
import CreateableSelect from './CreateableSelect';
import MultiSelect from './SelectAllSearchable';

const Field = (props: any) => {
  switch (props.type) {
    case 'multiselect':
      return <MultiSelect {...props} />;
    case 'options':
      return <AsyncSelectField {...props} />;
    case 'multicheckbox':
      return <AsyncMultiCheckbox {...props} />;
    case 'linesoptions':
      return <CustomAsyncSelectField {...props} />;
    case 'optionsWithPagination':
      return <AsyncSelectFieldWithPagination {...props} />;
    case 'select':
      return <SelectField {...props} />;
    case 'switch':
      return <SwitchButton {...props} />;
    case 'textarea':
      return <TextArea {...props} />;
    case 'files':
      return <InputFile {...props} />;
    case 'createable':
      return <CreateableSelect {...props} />;
    default:
      return <Input {...props} />;
  }
};

export { Field };
