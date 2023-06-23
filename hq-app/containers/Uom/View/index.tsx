'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { tabsConfiguration } from '../config';
import { skipToken } from '@reduxjs/toolkit/query';

import { ListWrapperMain, Tabs } from '@fridayfood/shared/components';
import {
  useFetchUOMDetailsQuery,
  useFetchUOMQuery,
} from 'services/modules/uom.api';
import { UOM_DETAILS } from '../types';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
// import Error from '@/pages/_error';

const UOMView = (props?: UOM_DETAILS) => {
  const { data } = useFetchUOMQuery({});
  const [id, setId] = useState<number | string>(Number(props?.id));
  const router = useRouter();
  const { currentData, isLoading } = useFetchUOMDetailsQuery(
    typeof id === 'string' || typeof id === 'number' ? id : skipToken,
    {
      // If the page is not yet generated, router.isFallback will be true
      // initially until getStaticProps() finishes running
      skip: router.isFallback,
    },
  );

  const onEdit = () => {
    router.push(`/settings/uom/edit/${id}`);
  };
  const create = () => {
    router.push(`/settings/uom/add`);
  };
  useEffect(() => {
    if (id) {
      (function () {
        typeof window !== 'undefined' && router.push(`/settings/uom/${id}`);
      })();
    }
  }, [id]);

  const GroupView = () => (
    <Tabs
      tabs={tabsConfiguration(currentData ?? {})}
      isTabHeaderShow={false}
      onClick={onEdit}
      // lineHeader="Conversion"
      isLoading={isLoading}
      topBorder={true}
    />
  );
  return (
    <ListWrapperMain
      data={data?.items}
      onItemClick={setId}
      addBtnClick={create}
      labelToShow="abc"
      Component={GroupView}
      addButton={true}
      listTitle="UOM"
      selectedOption={id}
      customClass="w-100"
    />
  );
};
// UOMView.ErrorComponent = Error;

export default withPermissions(UOMView, {
  permissionName: PERMISSIONS.VIEW_UOM,
});
