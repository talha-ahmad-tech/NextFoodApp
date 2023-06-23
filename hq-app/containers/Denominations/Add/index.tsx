import ListWrapperMain from '@fridayfood/shared/components/ListWrapperMain/index';
import { useRouter } from 'next/router';

import { ADD_UPDATE_FROM_PROPS } from '../types';
import FormFormEnhancer from './FormEnhancer';
import { useFetchDenominationsQuery } from 'services/modules/denominations.api';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';
const CreateDenominations = (props: ADD_UPDATE_FROM_PROPS) => {
  const { data } = useFetchDenominationsQuery({});

  const router = useRouter();

  const getId = (id?: number) => {
    router.push(`/settings/denominations/${id}`);
  };

  const addBtn = () => {
    router.push(`/settings/denominations/add`);
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
        listTitle="Denominations"
      />
    </>
  );
};

export default withPermissions(CreateDenominations, {
  permissionName: PERMISSIONS.CREATE_DENOMINATONS,
});
