import ListWrapperMain from '@fridayfood/shared/components/ListWrapperMain/index';
import { useRouter } from 'next/router';
import { ADD_UPDATE_FROM_PROPS } from '../types';
import FormFormEnhancer from './FormEnhancer';
import { useFetchFloorQuery } from 'services/modules/floors.api';
const CreateFloor = (props: ADD_UPDATE_FROM_PROPS) => {
  const { data } = useFetchFloorQuery({});

  const router = useRouter();
  const getId = (id?: number) => {
    router.push(`/storemanagement/floorManagement/${id}`);
  };
  const addBtn = () => {
    router.push(`/storemanagement/floorManagement/add`);
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
        listTitle="Add Floor"
      />
    </>
  );
};

export default CreateFloor;
