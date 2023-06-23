import ListWrapperMain from '@fridayfood/shared/components/ListWrapperMain/index';
import { useRouter } from 'next/router';
import { ADD_UPDATE_FROM_PROPS } from '../types';
import FormFormEnhancer from './FormEnhancer';
import { useFetchKitchensQuery } from 'services/modules/kitchen.api';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';
const CreateKitchens = (props: ADD_UPDATE_FROM_PROPS) => {
  const { data } = useFetchKitchensQuery({});
  const kitchenData = data?.items;
  const router = useRouter();
  const getId = (id?: number) => {
    router.push(`/settings/kitchenPrinter/${id}`);
  };
  const addBtn = () => {
    router.push(`/settings/kitchenPrinter/add`);
  };
  return (
    <>
      <ListWrapperMain
        customClass="w-100"
        data={kitchenData?.length > 0 ? kitchenData : null}
        onItemClick={getId}
        addBtnClick={addBtn}
        labelToShow="name"
        Component={() => FormFormEnhancer(props)}
        addButton={true}
        listTitle="Kitchen Printer"
      />
    </>
  );
};

export default withPermissions(CreateKitchens, {
  permissionName: PERMISSIONS.CREATE_KITCHEN_PRINTER,
});
