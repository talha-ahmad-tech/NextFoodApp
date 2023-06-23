import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { MODIFIER_DETAILS } from '../types';
import { ListWrapperMain, Tabs } from '@fridayfood/shared/components';
import {
  useFetchModifiersDetailsQuery,
  useFetchModifiersQuery,
} from 'services/modules/modifiers.api';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const ModifiersView = (props: MODIFIER_DETAILS) => {
  const router = useRouter();
  const { data } = useFetchModifiersQuery({});
  const [id, setId] = useState<number | string>(Number(props?.id));
  const { currentData } = useFetchModifiersDetailsQuery(Number(id));

  const onEdit = () => {
    router.push(`/menumanagement/modifiers/edit/${id}`);
  };
  const create = () => {
    router.push(`/menumanagement/modifiers/add`);
  };

  useEffect(() => {
    if (id) {
      (function () {
        typeof window !== 'undefined' &&
          router.push(`/menumanagement/modifiers/${id}`);
      })();
    }
  }, [id]);

  const GroupView = () => (
    <Tabs
      tabs={tabsConfiguration(currentData ?? {})}
      isTabHeaderShow={false}
      onClick={onEdit}
      lineHeader="Modifier Values"
      topBorder={true}
    />
  );

  return (
    <ListWrapperMain
      data={data?.items?.length > 0 ? data?.items : null}
      onItemClick={setId}
      addBtnClick={create}
      labelToShow=""
      Component={GroupView}
      addButton={true}
      listTitle="Modifier"
      customClass="w-100"
      selectedOption={id}
    />
  );
};

export default withPermissions(ModifiersView, {
  permissionName: PERMISSIONS.VIEW_MODIFIER,
});
