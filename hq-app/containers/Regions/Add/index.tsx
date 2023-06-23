import ListWrapperMain from '@fridayfood/shared/components/ListWrapperMain/index';
import { useRouter } from 'next/router';
import { useFetchRegionsQuery } from 'services/modules/regions.api';
import { ADD_UPDATE_FROM_PROPS } from '../types';
import FormFormEnhancer from './FormEnhancer';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
const CreateRegions = (props: ADD_UPDATE_FROM_PROPS) => {
  const { data } = useFetchRegionsQuery({});

  const router = useRouter();
  const getId = (id?: number) => {
    router.push(`/storemanagement/regions/${id}`);
  };
  const addBtn = () => {
    router.push(`/storemanagement/regions/add`);
  };
  return (
    <>
      <ListWrapperMain
        customClass="w-100"
        data={data?.items ?? []}
        onItemClick={getId}
        addBtnClick={addBtn}
        labelToShow="name"
        Component={() => FormFormEnhancer(props)}
        addButton={true}
        listTitle="Regions"
        selectedOption={props?.id}
      />
    </>
  );
};

export default withPermissions(CreateRegions, {
  permissionName: PERMISSIONS.CREATE_REGION,
});
