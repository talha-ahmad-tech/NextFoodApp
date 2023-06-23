import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  alertService,
  FiltersContext,
  FiltersListContext,
  // getQueryParam,
  SetFiltersContext,
  SetFiltersListContext,
} from '@fridayfood/shared/components';
import { useAuth } from 'oidc-react';
import { useGetOptions } from '@/utils/customHooks/useGetOtions';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import axios from 'axios';
import { urlConverter } from '@/utils/helper';

const useUtils = () => {
  const { requestOptions } = useGetOptions();
  const router = useRouter();
  const auth = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userData: any = jwt_decode(`${auth?.userData?.access_token}`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestApi = async (config?: any) => {
    const {
      endPoint = '',
      method = 'get',
      params,
      payload,
      baseUrlType,
      extension = false,
      search = '',
    } = config || {};

    const preUrl = extension
      ? 'https://preference.preview.fridaypos.com/api' + endPoint
      : urlConverter(baseUrlType) + '/api/app' + endPoint + `?key=${search}`;

    return await axios({
      method, //you can set what request you want to be
      url: preUrl,
      data: payload,
      params,
      headers: {
        Authorization: 'Bearer ' + auth.userData?.access_token,
        'Content-Type': 'application/json',
      },
    });
  };

  const optinsLoader = async ({
    search,
    url,
    colId,
    type,
    baseUrl = '',
  }: {
    search?: string;
    url: string;
    colId: string;
    type: string;
    params?: string;
    baseUrl?: string;
  }) => {
    try {
      const preUrl =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        urlConverter(baseUrl as any) + '/api/app' + url + `?key=${search}`;

      const { data, status } = await axios({
        method: 'get',
        url: preUrl,
        headers: {
          Authorization: 'Bearer ' + auth.userData?.access_token,
          'Content-Type': 'application/json',
        },
      });

      if (status === 200) {
        const options = data?.map((item: { [key: string]: string }) => ({
          label:
            colId === 'CustomerId' ? (
              <div>
                <p style={{ textTransform: 'capitalize' }}>{item?.name}</p>
                <label style={{ color: 'grey' }}>{`${item?.email}`}</label>
                <label
                  style={{ color: 'grey' }}
                >{`${item?.phoneNumber}`}</label>
              </div>
            ) : (
              item?.name
            ),

          value: `${item.id}`,
          colId,
          type,
          filter: 0,
        }));

        return {
          options,
          hasMore: false,
        };
      } else {
        return {
          options: [],
          hasMore: false,
        };
      }
    } catch (error) {}
  };

  const tenantId = userData?.tenantid;
  const userId = userData?.sub;
  // const tabs = getQueryParam('tabs');
  const componentType = router?.pathname?.split('/')?.at(-1);

  const filters = useContext(FiltersContext);
  const setFilters = useContext(SetFiltersContext);
  const filtersQuery = useContext(FiltersListContext);
  const setFiltersQuery = useContext(SetFiltersListContext);
  const dispatch = useDispatch();

  const getPreferenceUtil = async () => {
    const getPreferenceUtilResponse = await requestOptions({
      endPoint: `/api/Preference?userId=${userId}&tenantId=${tenantId}&component=${
        filters?.component ? filters?.component : componentType
      }`,
      baseURLType: 'filters',
      method: 'get',
    });
    const { status, data } = getPreferenceUtilResponse || {};
    if (status === 200) {
      setFilters({
        ...filters,
        fetchedFilters: { ...filters?.fetchedFilters, preferences: data },
      });
    }
  };

  const getOptions = async ({
    search,
    url,
    colId,
    type,
    baseUrl = '',
  }: {
    search?: string;
    url: string;
    colId: string;
    type: string;
    params?: string;
    baseUrl?: string;
  }) => {
    let options: { [key: string]: string }[] = [];

    const customConfigure = {
      endPoint: url,
      baseUrlType: baseUrl?.length ? baseUrl : 'products',
      method: 'get',
      params: search,
      search,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { status, data }: any = await requestApi(customConfigure);

    const formattedResponse = type === 'Dropdown' ? data : data;

    if (status === 200) {
      options = formattedResponse?.map((item: { [key: string]: string }) => ({
        label: type === 'Dropdown' ? item.name : item?.name,
        value: `${item.id}`,
        colId,
        type,
        filter: 0,
      }));
      return {
        options,
        hasMore: false,
      };
    } else {
      return {
        options: [],
        hasMore: false,
      };
    }
  };

  const getAllPreferences = async (name?: string) => {
    let options: { [key: string]: string }[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { status, data }: any = await requestOptions({
      endPoint: `/api/Preference?userId=${userId}&tenantId=${tenantId}&component=${
        filters?.component ? filters?.component : name
      }`,
      baseURLType: 'filters',
      method: 'get',
    });

    if (status === 200) {
      options = data?.map((item: { [key: string]: string }) => ({
        label: item?.name,
        value: item?.id,
      }));
      return {
        options,
        hasMore: false,
      };
    } else {
      return {
        options: [],
        hasMore: false,
      };
    }
  };

  const saveFilters = async (preference: string, callBack?: () => void) => {
    const payloads = {
      component: filters?.component,
      tenantId: tenantId,
      userId: userId,
      name: preference,
      userPreferences: filters?.userPreferences,
    };

    try {
      const response = await requestOptions({
        endPoint: '/api/Preference/createOrUpdate',
        baseURLType: 'filters',
        payload: payloads,
        method: 'post',
      });
      if (response?.status === 200) {
        alertService.success('Filter Saved!', {
          autoClose: true,
          keepAfterRouteChange: true,
        });
        callBack
          ? callBack()
          : () => {
              return 0;
            };
        setFilters({ ...filters, userPreferences: [], open: false });
      }
      getAllPreferences();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFilters({ ...filters, userPreferences: [] });
      alertService.error(error?.response?.data?.title, {
        autoClose: true,
        keepAfterRouteChange: true,
      });
      callBack
        ? callBack()
        : () => {
            return 0;
          };
      setFilters({ ...filters, open: false });
    }
  };

  const handleChangeFilter = (
    data: { [key: string]: string } | { [key: string]: string }[],
    key?: string,
    component?: string,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let resultedArray: any[] = [];
    let updatedUserPref = Object.keys(filters)?.length
      ? [...filters?.userPreferences]
      : [];
    if (Array.isArray(data)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mergedArray = data?.reduce((acc: any, obj) => {
        if (!acc[obj.colId]) {
          acc[obj.colId] = {
            colId: obj?.colId,
            value: obj?.value,
            filter: obj?.filter,
            type: obj?.type,
          };
        } else {
          acc[obj.colId].value += `,${obj?.value}`;
        }
        return acc;
      }, {});

      resultedArray = Object?.values(mergedArray);
    } else {
      resultedArray = [data];
    }

    if (key) {
      const currentPrefIndex = filters?.userPreferences?.findIndex(
        (pref: { colId: string }) => pref?.colId === key,
      );
      if (currentPrefIndex === -1) {
        updatedUserPref?.push(resultedArray[0]);
      } else {
        updatedUserPref = [
          ...updatedUserPref?.slice(0, currentPrefIndex),
          resultedArray[0],
          ...updatedUserPref?.slice(
            currentPrefIndex + 1,
            updatedUserPref?.length,
          ),
        ];
      }
    }
    updatedUserPref = updatedUserPref?.filter(
      (items: { [key: string]: string }) => items !== undefined,
    );
    const FilterQuery: { [key: string]: string } = {};
    updatedUserPref?.map((items: { [key: string]: string }) => {
      if (items?.colId && items?.value) {
        FilterQuery[items?.colId] = items?.value;
      }
    });

    setFilters({
      ...filters,
      userPreferences: updatedUserPref,
      FilterQuery: JSON.stringify(FilterQuery),
      component,
    });
    setFiltersQuery({ FilterQuery: JSON.stringify(FilterQuery) });
  };

  return {
    getOptions,
    filters,
    setFilters,
    dispatch,
    saveFilters,
    getPreferenceUtil,
    getAllPreferences,
    handleChangeFilter,
    filtersQuery,
    setFiltersQuery,
    optinsLoader,
  };
};
export default useUtils;
