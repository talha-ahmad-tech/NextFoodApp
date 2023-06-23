// import { ListWrapperMain } from '@fridayfood/shared/components';
// import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
// import { useFetchRolesQuery } from 'services/modules/roles.api';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { ADD_UPDATE_ROLES } from '../types';
import FormFormEnhancer from './FormEnhancer';
import { PERMISSIONS } from '@/utils/permissions';

const RolesForm = (props: ADD_UPDATE_ROLES) => {
  // const { data } = useFetchRolesQuery({});
  // const rolesData = data?.items;
  return (
    // <ListWrapperMain
    //   data={rolesData ?? []}
    //   onItemClick={() => {}}
    //   submitKey="name"
    //   labelToShow="name"
    //   Component={FormFormEnhancer}
    //   listTitle="Add Roles"
    //   heading="Roles"
    //   addButton={false}
    // />
    <FormFormEnhancer {...props} />
  );
};

export default withPermissions(RolesForm, {
  permissionName: PERMISSIONS.CREATE_ROLE,
});
