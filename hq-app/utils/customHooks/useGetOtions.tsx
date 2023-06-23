// import { AnyGridOptions } from 'ag-grid-community';
import axios from 'axios';
import { useAuth } from 'oidc-react';
import { useEffect, useState } from 'react';
import { urlConverter } from '../helper';

export type IGetOptions = {
  search?: string;
  customDataPicker?: string;
  endPoint?: string; // the api to call
  key?: string; // key is used for hiding place holders. this must be the name of the field
  fieldsToShow?: string[]; // an array of the fields to display
  v2?: boolean; // boolean used for apis in v2
  dataPickFromItems?: boolean; // if the return data is in items field send this flag true
  params?: object | string; // an object to of params sent to server
  customOptions?: boolean; // when you want specific object from response
  customLabel?: string; // for custom response like result[customKey].customLabel === result.vendor.name (for option label)
  customKey?: string; // for custom response like result[customKey] === result.vendor
  customButton?: boolean;
  remove?: boolean;
  method?: string;
  payload?: object;
  isFormattedData?: boolean;
  simpleOptions?: boolean;
  baseURLType?:
    | 'setup'
    | 'products'
    | 'filters'
    | 'core'
    | 'order'
    | 'sso'
    | '';
  paginatedEndPoint?: string;
  apiType?: string;
  paramsKey?: number | string;
};

interface FormattedOptions {
  name?: string;
  id?: number | string;
  label?: JSX.Element;
  value?: number | string;
}
interface DataResult {
  items?: object[];
  result?: object;
}
interface Resopnse {
  clusterStores: [];
  items?: { [key: string]: string }[];
  result?:
    | { items?: { [key: string]: string } }
    | object
    | { [key: string]: string }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | any;
  data?: { [key: string]: string }[] | DataResult;
}
export const useGetOptions = () => {
  const auth = useAuth();

  const [placeholders, setPlaceholders] = useState<{ [key: string]: string }>(
    {},
  );
  const [loadedOptionsFor, setLoadOptionsFor] = useState<{
    [key: string]: string;
  }>({});

  const requestOptions = async (config?: IGetOptions) => {
    const {
      endPoint = '',
      method = 'get',
      params,
      payload,
      baseURLType = 'products',
    } = config || {};
    const preUrl = urlConverter(baseURLType) + endPoint;

    return await axios({
      method, //you can set what request you want to be
      url: baseURLType === 'filters' ? preUrl : baseURLType + endPoint,
      data: payload,
      params,
      headers: {
        Authorization: 'Bearer ' + auth.userData?.access_token,
      },
    });
  };

  let dropDownData = {} as unknown;

  const getOptions =
    ({
      endPoint = '',
      key = '',
      dataPickFromItems = false,
      params,
      method = 'get',
      payload,
      isFormattedData = false,
      simpleOptions = false,
      baseURLType = '',
      customDataPicker = '',
    }: IGetOptions) =>
    async (searched?: string) => {
      try {
        let options: { [key: string]: string }[] = [];
        let customoptions: { [key: string]: string }[] = [];

        let formattedOptions: FormattedOptions[] | { [key: string]: string }[] =
          [];
        const config = {
          endPoint,
          params,
          baseURLType: urlConverter(baseURLType),
          payload,
          method,
        };
        const { status, data }: { status?: string | number; data?: Resopnse } =
          await requestOptions(config);
        if (status === 200) {
          dropDownData = data;
          if (dataPickFromItems) {
            options = Array.isArray(data)
              ? data
              : data?.result?.items
              ? data.result.items
              : data?.clusterStores
              ? data?.clusterStores
              : data?.items;
          } else {
            options = data as unknown as { [key: string]: string }[];
          }
          options =
            !Array.isArray(searched) && searched?.length
              ? options?.filter((items: { name?: string }) =>
                  items?.name?.toLowerCase()?.includes(searched?.toLowerCase()),
                )
              : [...options];

          if (customDataPicker) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            customoptions = options?.map((item: any) => {
              return {
                ...item,
                label: item?.id,
                value: item.id,
                name: item?.id,
              };
            });
          }
          options = options?.map((item: { [key: string]: string }) => {
            const label = item?.name ? item.name : item.id;
            const noFilterOptions = {
              ...item,
              label,
              value: item.id,
              name: label,
            };
            return noFilterOptions;
          });
          dropDownData = options;
          loadedOptionsFor[key] = 'true';
          if (isFormattedData) {
            formattedOptions = options?.map(
              (items: { [key: string]: string }) => {
                return {
                  ...items,
                  label: `${items?.id}${'\xa0'.repeat(20)}${items?.name} / ${
                    items?.description
                  }`,
                  value: items?.id,
                };
              },
            );
          }

          setLoadOptionsFor({ ...loadedOptionsFor });
          const resultantOptions = isFormattedData
            ? formattedOptions
            : dropDownData;

          return simpleOptions
            ? options
            : customDataPicker
            ? customoptions
            : isFormattedData
            ? formattedOptions?.length
              ? formattedOptions
              : []
            : {
                options: resultantOptions,
                hasMore: false,
              };
        } else {
          return simpleOptions
            ? []
            : {
                options: [],
                hasMore: false,
              };
        }
      } catch (error) {
        // dropDownData = {};
        dropDownData = simpleOptions ? [] : {};
        return {
          options: [],
          hasMore: false,
        };
      }
    };
  const taxFormatter = (items: {
    name?: string;
    id?: number;
    description?: string;
  }) => {
    return (
      <div
        style={{
          height: '50x',
        }}
      >
        <span
          style={{
            marginRight: '25px',
          }}
        >
          {items?.name}
        </span>
        <span>{items?.name}</span>
      </div>
    );
  };

  const opts = [
    {
      id: 3,
      name: 'Retail Tax',
      label: 'Retail Tax',
      description: 'Retail Sales Tax',
    },
    {
      id: 4,
      name: 'Withholding Tax',
      label: 'Withholding Tax',
      description: 'Withholding Sales Tax',
    },
    {
      id: 5,
      name: 'PRA Tax 12%',
      label: 'PRA Tax 12%',
      description: 'PRA Sales Tax',
    },
    {
      id: 6,
      name: 'FBR Tax 10%',
      label: 'FBR Tax 10%',
      description: 'FBR Sales Tax',
    },
  ];
  const formattedOptions = (data: { [key: string]: string }[]) =>
    data?.map((items: { [key: string]: string }) => {
      return {
        ...items,

        label: (
          <div
            style={{
              height: '60x',
            }}
          >
            <span
              style={{
                marginRight: '50px',
              }}
            >
              {items?.id ? items?.id : items?.ids}
            </span>
            <span
              style={{
                marginRight: '50px',
              }}
            >
              {items?.name ? items?.name : items?.id}
            </span>
            <span>{items?.description ? items?.description : items?.id}</span>
          </div>
        ),

        value: items?.id,
      };
    });

  return {
    formattedOptions,
    taxFormatter,
    placeholders,
    setPlaceholders,
    loadedOptionsFor,
    setLoadOptionsFor,
    dropDownData,
    requestOptions,
    getOptions,
    opts,
  };
};

export const useSelectionGetter = ({
  isFormattedData = false,
  endPoint = '',
  method = 'get',
  key = '',
  fieldsToShow = [''],
  dataPickFromItems = true,
  baseURLType = '',
  simpleOptions = false,
}: {
  simpleOptions?: boolean;
  isFormattedData?: boolean;
  endPoint?: string;
  method?: string;
  key?: string;
  fieldsToShow?: string[];
  dataPickFromItems?: boolean;
  baseURLType?:
    | ''
    | 'setup'
    | 'products'
    | 'filters'
    | 'core'
    | 'order'
    | 'sso'
    | undefined;
}) => {
  const { getOptions } = useGetOptions();
  const [vals, setVals] = useState([]);
  const response = getOptions({
    simpleOptions,
    isFormattedData,
    endPoint,
    method,
    key,
    fieldsToShow,
    dataPickFromItems,
    baseURLType,
  });
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Promise?.resolve(response())?.then((v: any) => {
      setVals(v?.length ? v : []);
    });
  }, []);
  return vals;
};
