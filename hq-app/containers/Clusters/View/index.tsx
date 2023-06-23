'use client';
import React, { useState, useEffect } from 'react';
import { tabsConfiguration } from '../config';
import { skipToken } from '@reduxjs/toolkit/query';
import ListWrapperMain from '@fridayfood/shared/components/ListWrapperMain/index';
import {
  useFetchClusterDetailsQuery,
  useFetchClustersQuery,
} from 'services/modules/clusters.api';
import { useRouter } from 'next/router';
import { CLUSTERS_DETAILS } from '../types';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const ClustersView = (props?: CLUSTERS_DETAILS) => {
  const router = useRouter();
  const [ids, setId] = useState<number | string>(Number(props?.id));
  const { data } = useFetchClustersQuery({});

  const { currentData, refetch } = useFetchClusterDetailsQuery(
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
      router.push(`/storemanagement/clusters/edit/${ids}`);
  };
  const create = () => {
    router.push(`/storemanagement/clusters/add`);
  };

  const tabsData = tabsConfiguration(currentData ?? {});
  useEffect(() => {
    if (ids) {
      (function () {
        typeof window !== 'undefined' &&
          router.push(`/storemanagement/clusters/${ids}`);
      })();
    }
  }, [ids]);

  return (
    <ListWrapperMain
      customClass="w-100"
      data={data?.length > 0 ? data : null}
      onItemClick={setId}
      addBtnClick={create}
      onClick={onEdit}
      headerData={tabsData}
      labelToShow="name"
      addButton={true}
      listTitle="Clusters"
      selectedOption={ids}
    />
  );
};

export default withPermissions(ClustersView, {
  permissionName: PERMISSIONS.VIEW_CLUSTER,
});
