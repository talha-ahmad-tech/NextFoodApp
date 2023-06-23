import { memo, useState } from 'react';
import ChartsWrapper from '@fridayfood/shared/components/ChartsWrapper';
import Footer from '@fridayfood/shared/components/Footer';
import {
  BarChart,
  BarchartHorizontal,
  DoughnutChart,
  LineBarChart,
} from './Charts';
import { DateTimeFilters } from '../../components/FilterHeader/DateTimeFilters';
import TopWidget from './TopWidget';
import {
  useFetchSalesBySourceQuery,
  useFetchSalesByStoresQuery,
  useFetchsalesTrendsQuery,
  useFetchWidgetDataQuery,
  useFetchSalesByOrderTypeQuery,
  useFetchHourlySalesQuery,
} from 'services/modules/reports.api';
import { Loader } from '@fridayfood/ui-toolkit';
import { useSelectionGetter } from '@/utils/customHooks/useGetOtions';
import { StoresApis } from 'services/modules/stores.api';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useEffectAfterMount } from '@fridayfood/shared';
import moment from 'moment';
// import { skipToken } from '@reduxjs/toolkit/dist/query';
const today = moment().format('MM-DD-YYYY');
const startTime = ' 00:00:00';
const endTime = ' 23:59:00';
const endDate = today + endTime;

const Dashboard = () => {
  const storesOptions = useSelectionGetter({
    endPoint: StoresApis.storeLookup,
    method: 'get',
    key: 'store',
    fieldsToShow: ['name'],
    dataPickFromItems: true,
    baseURLType: 'core',
    simpleOptions: true,
  });

  const [dates, setDates] = useState<{
    start: string;
    end: string;
    StoreIds?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter?: any;
  }>({ start: today + startTime, end: endDate, StoreIds: [] });
  const {
    data: WidgetsData,
    isLoading,
    isFetching,
    refetch: refetchWidget,
  } = useFetchWidgetDataQuery({
    StartDate: dates.start,
    EndDate: dates.end,
  });

  const { data: salesData, isLoading: salesLoading } = useFetchsalesTrendsQuery(
    {
      EndDate: dates.end,
      StartDate: dates.start,
      ...(dates?.StoreIds?.length && {
        StoreIds: JSON.stringify(dates?.StoreIds),
      }),
    },
  );

  const { data: orderData, isLoading: orderLoading } =
    useFetchSalesByOrderTypeQuery({
      EndDate: dates.end,
      StartDate: dates.start,
      ...(dates?.StoreIds?.length && {
        StoreIds: JSON.stringify(dates?.StoreIds),
      }),
    });

  const { data: storesData, isLoading: storesLoading } =
    useFetchSalesByStoresQuery(
      {
        EndDate: dates.end,
        StartDate: dates.start,
        ...(dates?.StoreIds?.length && {
          StoreIds: JSON.stringify(dates?.StoreIds),
        }),
      },
      {
        skip: !dates?.StoreIds?.length,
      },
    );
  const { data: sourceData, isLoading: sourceLoading } =
    useFetchSalesBySourceQuery({
      EndDate: dates.end,
      StartDate: dates.start,
      ...(dates?.StoreIds?.length && {
        StoreIds: JSON.stringify(dates?.StoreIds),
      }),
    });

  const { data: hourlyData, isLoading: hourlyLoading } =
    useFetchHourlySalesQuery({
      EndDate: dates.end,
      StartDate: dates.start,
      ...(dates?.StoreIds?.length && {
        StoreIds: JSON.stringify(dates?.StoreIds),
      }),
    });

  useEffectAfterMount(() => {
    refetchWidget();
  }, [dates?.StoreIds, dates?.end, dates?.start]);

  return (
    <>
      <>
        {isFetching ||
        isLoading ||
        salesLoading ||
        hourlyLoading ||
        sourceLoading ||
        storesLoading ||
        orderLoading ? (
          <Loader />
        ) : null}
      </>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <Field
            isFullWidth
            noLabel
            type="multiselect"
            componentType="listwithcount"
            options={storesOptions}
            label={''}
            name={'store'}
            onChange={(e: []) => {
              let resultantStores: string[] = [];

              e?.forEach((items: { id: string }) => {
                resultantStores = [...resultantStores, items?.id];
              });
              setDates({ ...dates, StoreIds: resultantStores });
            }}
          />
        </div>
        <div className="col-sm-12 col-md-6 mb-3">
          <DateTimeFilters
            onFilterChange={(values: {
              start: string;
              end: string;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              filter?: any;
            }) => {
              setDates({ ...dates, start: values.start, end: values?.end });
            }}
          />
        </div>
      </div>

      <>
        <div className="custom-tabs-wrapper-content">
          <div
            className="tab-content custom-tabs-wrapper-content__content"
            id="pills-tabContent"
          >
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <TopWidget WidgetsData={WidgetsData} />
              <div className="row">
                <div className="col-12 col-xl-6 pb-4 custom-grid-desktop-only">
                  <ChartsWrapper heading="Sales Trend">
                    <LineBarChart data={salesData} />
                  </ChartsWrapper>
                </div>
                <div className="col-12 col-xl-6 pb-4 custom-grid-desktop-only">
                  <ChartsWrapper heading="Sales By Order Type">
                    <DoughnutChart data={orderData} />
                  </ChartsWrapper>
                </div>
                <div className="col-12 col-xl-6 pb-4 custom-grid-desktop-only">
                  <ChartsWrapper heading="Sales By Order Source">
                    <DoughnutChart data={sourceData} />
                  </ChartsWrapper>
                </div>
                <div className="col-12 col-xl-6 pb-4 custom-grid-desktop-only">
                  <ChartsWrapper heading="Sales By Payment">
                    <DoughnutChart data={{}} />
                  </ChartsWrapper>
                </div>
                <div className="col-12 col-xl-6 pb-4 custom-grid-desktop-only">
                  <ChartsWrapper heading="Sales By Location ">
                    <BarchartHorizontal data={storesData} />
                  </ChartsWrapper>
                </div>
                <div className="col-12 col-xl-6 pb-4 custom-grid-desktop-only">
                  <ChartsWrapper heading="Sales By Hourly Sales">
                    <BarChart data={hourlyData} />
                  </ChartsWrapper>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default memo(Dashboard);
