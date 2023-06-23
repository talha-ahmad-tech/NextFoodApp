import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { ITEM_GROUP_DETAILS } from '../types';
import { ListWrapperMain, Tabs } from '@fridayfood/shared/components';
import {
  useFetchItemGroupQuery,
  useFetchItemGroupDetailsQuery,
} from 'services/modules/itemGroup.api';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const ItemGroupView = (props: ITEM_GROUP_DETAILS) => {
  const router = useRouter();
  const { data } = useFetchItemGroupQuery({});
  const [id, setId] = useState<number | string>(Number(props?.id));
  const { currentData } = useFetchItemGroupDetailsQuery(Number(id));

  const onEdit = () => {
    router.push(`/menumanagement/itemgroup/edit/${id}`);
  };
  const create = () => {
    router.push(`/menumanagement/itemgroup/add`);
  };

  useEffect(() => {
    if (id) {
      (function () {
        typeof window !== 'undefined' &&
          router.push(`/menumanagement/itemgroup/${id}`);
      })();
    }
  }, [id]);

  const GroupView = () => (
    <Tabs
      tabs={tabsConfiguration(currentData)}
      isTabHeaderShow={false}
      onClick={onEdit}
      topBorder={true}
    />
  );

  return (
    <ListWrapperMain
      data={data?.items.length ? data?.items : null}
      onItemClick={setId}
      addBtnClick={create}
      labelToShow="abc"
      Component={GroupView}
      addButton={true}
      selectedOption={id}
      listTitle={props?.name ?? 'Item Group'}
      customClass="w-100"
    />
  );
};

export default withPermissions(ItemGroupView, {
  permissionName: PERMISSIONS.VIEW_ITEM_GROUP,
});
