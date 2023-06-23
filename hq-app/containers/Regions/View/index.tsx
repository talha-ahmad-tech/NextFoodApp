'use client';
import React, { useState, useEffect } from 'react';
import { tabsConfiguration } from '../config';
import { skipToken } from '@reduxjs/toolkit/query';
import ListWrapperMain from '@fridayfood/shared/components/ListWrapperMain/index';

import { useRouter } from 'next/router';
import { REGION_DETAILS } from '../types';
import {
  useFetchRegionDetailsQuery,
  useFetchRegionsQuery,
} from 'services/modules/regions.api';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const RegionsView = (props?: REGION_DETAILS) => {
  const router = useRouter();
  const [ids, setId] = useState<number | string>(Number(props?.id));
  const { data } = useFetchRegionsQuery({});

  const { currentData, refetch } = useFetchRegionDetailsQuery(
    typeof ids === 'string' || typeof ids === 'number' ? ids : skipToken,
    {
      skip: router.isFallback,
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  const onEdit = () => {
    typeof window !== 'undefined' &&
      router.push(`/storemanagement/regions/edit/${ids}`);
  };
  const create = () => {
    router.push(`/storemanagement/regions/add`);
  };
  const tabsData = tabsConfiguration(currentData ?? {});
  useEffect(() => {
    if (ids) {
      (function () {
        typeof window !== 'undefined' &&
          router.push(`/storemanagement/regions/${ids}`);
      })();
    }
  }, [ids]);

  return (
    <ListWrapperMain
      customClass="w-100"
      data={data?.items ?? []}
      onItemClick={setId}
      addBtnClick={create}
      onClick={onEdit}
      headerData={tabsData}
      labelToShow="name"
      addButton={true}
      listTitle="Regions"
      selectedOption={ids}
    />
  );
};

export default withPermissions(RegionsView, {
  permissionName: PERMISSIONS.VIEW_REGION,
});
