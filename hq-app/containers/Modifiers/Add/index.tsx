import { ADD_UPDATE_FROM_PROPS } from '../types';
import FormEnhancer from './FormEnhancer';
import {
  ListWrapperMain,
  ProductsProvider,
} from '@fridayfood/shared/components';
import { useFetchModifiersQuery } from 'services/modules/modifiers.api';
import { useRouter } from 'next/router';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const ModifiersForm = (props: ADD_UPDATE_FROM_PROPS) => {
  const router = useRouter();

  const { data } = useFetchModifiersQuery({});
  const modifiers = data?.items;

  const addBtn = () => {
    router.push(`/menumanagement/modifiers/add`);
  };

  const getId = (id?: number) => {
    router.push(`/menumanagement/modifiers/${id}`);
  };

  return (
    <div>
      <ProductsProvider>
        <ListWrapperMain
          data={modifiers}
          onItemClick={getId}
          addBtnClick={addBtn}
          labelToShow=""
          Component={() => FormEnhancer(props)}
          addButton={true}
          listTitle="Modifiers"
          customClass="w-100"
        />
      </ProductsProvider>
    </div>
  );
};

export default withPermissions(ModifiersForm, {
  permissionName: PERMISSIONS.CREATE_MODIFIER,
});
