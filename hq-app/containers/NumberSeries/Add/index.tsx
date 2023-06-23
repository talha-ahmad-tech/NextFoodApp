import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { ADD_UPDATE_NUMBER_SERIES } from '../types';
import FormFormEnhancer from './FormEnhancer';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const NumberSeriesForm = (props: ADD_UPDATE_NUMBER_SERIES) => {
  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper
        title={props.id ? 'Update Number Sequence' : 'Create Number Sequence'}
      />
      <FormFormEnhancer {...props} />
    </div>
  );
};

export default withPermissions(NumberSeriesForm, {
  permissionName: PERMISSIONS.CREATE_NUMBER_SERIES,
});
