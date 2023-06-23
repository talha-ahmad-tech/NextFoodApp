import { ADD_UPDATE_FROM_PROPS } from '../types';
import UOMFormEnhancer from './FormEnhancer';
import { ListWrapperMain } from '@fridayfood/shared/components';
import { useFetchUOMQuery } from 'services/modules/uom.api';
import { useRouter } from 'next/router';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const UOMForm = (props: ADD_UPDATE_FROM_PROPS) => {
  const router = useRouter();
  const { data = [] } = useFetchUOMQuery({});
  const getId = (id?: number) => {
    router.push(`/settings/uom/${id}`);
  };
  const addBtn = () => {
    router.push(`/settings/uom/add`);
  };
  return (
    <div>
      <ListWrapperMain
        data={data?.items}
        onItemClick={getId}
        addBtnClick={addBtn}
        Component={() => UOMFormEnhancer(props)}
        addButton={true}
        listTitle="UOM"
      />
    </div>
  );
};

export default withPermissions(UOMForm, {
  permissionName: PERMISSIONS.CREATE_UOM,
});
