'use client';
import React, { useEffect, useState } from 'react';
import { tabsConfiguration } from '../config';
import ListWrapperMain from '@fridayfood/shared/components/ListWrapperMain/index';
import {
  useFetchKitchenDetailsQuery,
  useFetchKitchensQuery,
} from 'services/modules/kitchen.api';
import { useRouter } from 'next/router';
import { KITCHEN_DETAILS } from '../types';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';

const KitchensView = (props?: KITCHEN_DETAILS) => {
  const router = useRouter();
  const [ids, setId] = useState<number | string>(Number(props?.id));
  const { data } = useFetchKitchensQuery({});
  const kitchenData = data?.items;
  const { currentData } = useFetchKitchenDetailsQuery(
    typeof ids === 'string' || typeof ids === 'number' ? ids : skipToken,
    {
      skip: router.isFallback,
    },
  );

  const onEdit = () => {
    typeof window !== 'undefined' &&
      router.push(`/settings/kitchenPrinter/edit/${ids}`);
  };
  const create = () => {
    router.push(`/settings/kitchenPrinter/add`);
  };
  const tabsData = tabsConfiguration(currentData ?? {});

  useEffect(() => {
    if (ids) {
      (function () {
        typeof window !== 'undefined' &&
          router.push(`/settings/kitchenPrinter/${ids}`);
      })();
    }
  }, [ids]);

  return (
    <ListWrapperMain
      customClass="w-100"
      data={kitchenData?.length > 0 ? kitchenData : null}
      onItemClick={setId}
      addBtnClick={create}
      onClick={onEdit}
      headerData={tabsData}
      labelToShow="name"
      addButton={true}
      selectedOption={ids}
      listTitle="Kitchen Printer"
    />
  );
};

export default withPermissions(KitchensView, {
  permissionName: PERMISSIONS.VIEW_KITCHEN_PRINTER,
});
