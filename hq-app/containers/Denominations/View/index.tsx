'use client';
import React, { useState, useEffect } from 'react';
import { tabsConfiguration } from '../config';
import { skipToken } from '@reduxjs/toolkit/query';
import ListWrapperMain from '@fridayfood/shared/components/ListWrapperMain/index';

import { useRouter } from 'next/router';
import { DENOMINATIONS_DETAILS } from '../types';
import {
  useFetchDenominationsDetailsQuery,
  useFetchDenominationsQuery,
} from 'services/modules/denominations.api';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';

const DenominationsView = (props?: DENOMINATIONS_DETAILS) => {
  const router = useRouter();
  const [ids, setId] = useState<number | string>(Number(props?.id));
  const { data } = useFetchDenominationsQuery({});
  const { currentData } = useFetchDenominationsDetailsQuery(
    typeof ids === 'string' || typeof ids === 'number' ? ids : skipToken,
    {
      skip: router.isFallback,
    },
  );
  const onEdit = () => {
    typeof window !== 'undefined' &&
      router.push(`/settings/denominations/edit/${ids}`);
  };
  const create = () => {
    router.push(`/settings/denominations/add`);
  };

  const tabsData = tabsConfiguration(currentData ?? {});
  useEffect(() => {
    if (ids) {
      (function () {
        typeof window !== 'undefined' &&
          router.push(`/settings/denominations/${ids}`);
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
      selectedOption={ids}
      addButton={true}
      listTitle="Denominations"
    />
  );
};

export default withPermissions(DenominationsView, {
  permissionName: PERMISSIONS.VIEW_DENOMINATIONS,
});
