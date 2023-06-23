import { useRouter } from 'next/router';
import { ADD_UPDATE_FROM_PROPS } from '../types';
import FormEnhancer from './FormEnhancer';
import { ListWrapperMain } from '@fridayfood/shared/components';
import { useFetchItemGroupQuery } from 'services/modules/itemGroup.api';

const ItemGroupForm = (props: ADD_UPDATE_FROM_PROPS) => {
  const router = useRouter();
  const { data } = useFetchItemGroupQuery({});

  const getId = (id?: number) => {
    router.push(`/menumanagement/itemgroup/${id}`);
  };

  const addBtn = () => {
    router.push(`/menumanagement/itemgroup/add`);
  };

  return (
    <div>
      <ListWrapperMain
        customClass="w-100"
        data={data?.items.length ? data?.items : null}
        onItemClick={getId}
        addBtnClick={addBtn}
        labelToShow="abc"
        Component={() => FormEnhancer(props)}
        addButton={true}
        listTitle="Item Group"
      />
    </div>
  );
};

export default ItemGroupForm;
