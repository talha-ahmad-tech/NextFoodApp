import ListWrapperMain from '@fridayfood/shared/components/ListWrapperMain/index';
import { useRouter } from 'next/router';
import { useFetchClustersQuery } from 'services/modules/clusters.api';
import { ADD_UPDATE_FROM_PROPS } from '../types';
import FormFormEnhancer from './FormEnhancer';
const CreateClusters = (props: ADD_UPDATE_FROM_PROPS) => {
  const { data } = useFetchClustersQuery({});
  const router = useRouter();

  const getId = (id?: number) => {
    router.push(`/storemanagement/clusters/${id}`);
  };

  const addBtn = () => {
    router.push(`/storemanagement/clusters/add`);
  };

  return (
    <>
      <ListWrapperMain
        customClass="w-100"
        data={data?.length > 0 ? data : null}
        onItemClick={getId}
        addBtnClick={addBtn}
        labelToShow="name"
        Component={() => FormFormEnhancer(props)}
        addButton={true}
        listTitle="Clusters"
        selectedOption={props?.id}
      />
    </>
  );
};

export default CreateClusters;
