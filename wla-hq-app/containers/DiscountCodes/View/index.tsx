'use client';
import React, { useState, useEffect } from 'react';
import { tabsConfiguration } from '../config';
import { skipToken } from '@reduxjs/toolkit/query';
import ListWrapperMain from '@fridayfood/shared/components/ListWrapperMain/index';

import { useRouter } from 'next/router';
import { DISCOUNT_DETAILS } from '../types';
import {
  useFetchDiscountDetailsQuery,
  useFetchDiscountQuery,
} from 'services/modules/discount.api';
import DiscountFormEnhancer from '../Add/FormEnhancer';

const DiscountCodeView = (props?: DISCOUNT_DETAILS) => {
  const router = useRouter();
  const [id, setId] = useState<number | string>(Number(props?.id));
  const { data } = useFetchDiscountQuery({});

  const { currentData } = useFetchDiscountDetailsQuery(
    typeof id === 'string' || typeof id === 'number' ? id : skipToken,
    {
      skip: router.isFallback,
    },
  );
  const onEdit = () => {
    typeof window !== 'undefined' &&
      router.push(`/settings/discountcode/edit/${id}`);
  };
  const create = () => {
    router.push(`/settings/discountcode/add`);
  };
  const tabsData = tabsConfiguration(currentData?.data ?? {});
  useEffect(() => {
    if (id) {
      (function () {
        typeof window !== 'undefined' &&
          router.push(`/settings/discountcode/${id}`);
      })();
    }
  }, [id]);

  return (
    <ListWrapperMain
      selectedOption={id}
      customClass="w-100"
      whenEmptyMessage="No Discount Codes"
      data={data?.data?.length > 0 ? data?.data : null}
      onItemClick={setId}
      // addBtnClick={create}
      // onClick={onEdit}
      headerData={tabsData}
      Component={DiscountFormEnhancer}
      labelToShow="name"
      addButton={false}
      listTitle="Discounts"
    />
  );
};

export default DiscountCodeView;
