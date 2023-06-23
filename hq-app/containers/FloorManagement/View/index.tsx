'use client';
import React, { useState, useEffect } from 'react';
import { tabsConfiguration } from '../config';
import { skipToken } from '@reduxjs/toolkit/query';
import ListWrapperMain from '@fridayfood/shared/components/ListWrapperMain/index';

import { useRouter } from 'next/router';
import { FLOOR_DETAILS } from '../types';

import {
  useFetchFloorQuery,
  useFetchFloorDetailsQuery,
} from 'services/modules/floors.api';

const FloorView = (props?: FLOOR_DETAILS) => {
  const router = useRouter();
  const [ids, setId] = useState<number | string>(Number(props?.id));
  const { data } = useFetchFloorQuery({});

  const { currentData } = useFetchFloorDetailsQuery(
    typeof ids === 'string' || typeof ids === 'number' ? ids : skipToken,
    {
      skip: router.isFallback,
    },
  );

  const onEdit = () => {
    typeof window !== 'undefined' &&
      router.push(`//storemanagement/floorManagement/edit/${ids}`);
  };
  const create = () => {
    router.push(`//storemanagement/floorManagement/add`);
  };
  const tabsData = tabsConfiguration(currentData ?? {});
  useEffect(() => {
    if (ids) {
      (function () {
        typeof window !== 'undefined' &&
          router.push(`//storemanagement/floorManagement/${ids}`);
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
      listTitle="Floor Management"
    />
  );
};

export default FloorView;
