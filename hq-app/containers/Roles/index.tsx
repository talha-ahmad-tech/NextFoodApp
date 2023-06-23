import { ListWrapperMain } from '@fridayfood/shared/components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFetchRolesQuery } from 'services/modules/roles.api';

import TreeViews from './treeViews';
import { useEffectAfterSuccess } from '@fridayfood/shared';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const Roles = () => {
  const [itemClicked, setItemClicked] = useState<string>('');
  const { data, isSuccess } = useFetchRolesQuery(
    {},
    {
      skip: itemClicked !== '',
    },
  );

  useEffectAfterSuccess(() => {
    setItemClicked(data?.items[0]?.name);
  }, isSuccess);

  const rolesData = data?.items;
  const router = useRouter();
  const treeFunction = () => {
    return <TreeViews itemClicked={itemClicked} />;
  };
  return (
    <ListWrapperMain
      customClass="w-100"
      data={rolesData ?? []}
      onItemClick={(item: string) => {
        setItemClicked(item);
      }}
      addButton={true}
      addBtnClick={() => {
        router.push('/staffmanagement/roles/add');
      }}
      submitKey="name"
      labelToShow="name"
      selectedOption={itemClicked}
      Component={treeFunction}
      listTitle="Roles & Permissions"
      heading="Roles"
    />
  );
};

export default withPermissions(Roles, {
  permissionName: PERMISSIONS.VIEW_ROLE,
});
