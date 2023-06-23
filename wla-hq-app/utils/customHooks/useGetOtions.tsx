// import { AnyGridOptions } from 'ag-grid-community';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { urlConverter } from '../helper';

interface IGetOptions {
  endPoint?: string; // the api to call
  key?: string; // key is used for hiding place holders. this must be the name of the field
  fieldsToShow?: string[]; // an array of the fields to display
  v2?: boolean; // boolean used for apis in v2
  dataPickFromItems?: boolean; // if the return data is in items field send this flag true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any; // an object to of params sent to server
  customOptions?: boolean; // when you want specific object from response
  customLabel?: string; // for custom response like result[customKey].customLabel === result.vendor.name (for option label)
  customKey?: string; // for custom response like result[customKey] === result.vendor
  customButton?: boolean;
  remove?: boolean;
  method?: string;
  payload?: object;
  isFormattedData?: boolean;
  simpleOptions?: boolean;
  isFiltered?: boolean;
  baseURLType?: string;
}

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
  items?: { [key: string]: string }[];
  result?:
    | { items?: { [key: string]: string } }
    | object
    | { [key: string]: string }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | any;

  data?: { [key: string]: string }[] | DataResult;
  pagination?: {
    data?: { [key: string]: string }[] | DataResult;
  };
}
export const useGetOptions = () => {
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
      baseURLType,
    } = config || {};

    return await axios({
      method, //you can set what request you want to be
      url: baseURLType + endPoint,
      data: payload,
      params,
      headers: {
        // Authorization: 'Bearer ' + localStorage.getItem('token'),
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
      isFiltered = false,
      simpleOptions = false,
      baseURLType = '',
    }: IGetOptions) =>
    async () => {
      try {
        let options: { [key: string]: string }[] | undefined = [];
        const filteredOptions:
          | { [key: string]: string | number | boolean }[]
          | undefined = [];

        let formattedOptions:
          | FormattedOptions[]
          | { [key: string]: string }[]
          | undefined = [];
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
              ? data?.result?.items
              : data?.pagination?.data
              ? data?.pagination?.data
              : data?.items;
          } else {
            options = data?.data as { [key: string]: string }[];
          }

          if (isFormattedData) {
            formattedOptions = options?.map(
              (items: { [key: string]: string }) => {
                return {
                  ...items,
                  label: (
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
                  ),
                  value: items?.id,
                };
              },
            );
            formattedOptions?.unshift({
              label: (
                <div
                  style={{
                    height: '50x',
                  }}
                >
                  <span
                    style={{
                      marginRight: '45px',
                    }}
                  >
                    Name
                  </span>
                  <span>Description</span>
                </div>
              ),
              value: 0,
            });
          }

          let filterOptionMapped = {};
          isFiltered
            ? options?.map(
                (item: { [key: string]: string | number | boolean }) => {
                  if (item.discountApplicable === 1) {
                    filterOptionMapped = {
                      ...item,
                      label: item.name,
                      value: item.id,
                      name: item.name,
                    };
                    filteredOptions?.push(filterOptionMapped);
                  }
                },
              )
            : (options = options?.map((item: { [key: string]: string }) => {
                const label = item.name;
                const noFilterOptions = {
                  ...item,
                  label,
                  value: item.id,
                  name: label,
                };
                return noFilterOptions;
              }));

          loadedOptionsFor[key] = 'true';

          setLoadOptionsFor({ ...loadedOptionsFor });

          const resultantOptions = isFormattedData
            ? formattedOptions
            : isFiltered
            ? filteredOptions
            : options;

          return simpleOptions
            ? options
            : isFiltered
            ? filteredOptions
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
  const formattedOptions = (
    data: {
      product?: { [key: string]: string };
      itemGroup?: { [key: string]: string };
      store?: { [key: string]: string };
    }[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fieldName?: string,
  ) => {
    const result =
      data.length > 0 &&
      data?.map(
        (items: {
          product?: { [key: string]: string };
          itemGroup?: { [key: string]: string };
          store?: { [key: string]: string };
        }) => {
          return {
            label: items?.product?.name
              ? items?.product?.name
              : items?.itemGroup?.name
              ? items?.itemGroup?.name
              : items?.store?.name && items?.store?.name,
            name: items?.product?.name
              ? items?.product?.name
              : items?.itemGroup?.name
              ? items?.itemGroup?.name
              : items?.store?.name && items?.store?.name,
            value: items?.product?.id
              ? items?.product?.id
              : items?.itemGroup?.id
              ? items?.itemGroup?.id
              : items?.store?.id && items?.store?.id,
            id: items?.product?.id
              ? items?.product?.id
              : items?.itemGroup?.id
              ? items?.itemGroup?.id
              : items?.store?.id && items?.store?.id,
          };
        },
      );
    return result;
  };

  return {
    getOptions,
    formattedOptions,
    placeholders,
    setPlaceholders,
    loadedOptionsFor,
    setLoadOptionsFor,
    dropDownData,
    requestOptions,
  };
};

export const useSelectionGetter = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isFiltered = false,
  isFormattedData = false,
  endPoint = '',
  method = 'get',
  key = '',
  fieldsToShow = [''],
  dataPickFromItems = true,
  baseURLType = '',
  simpleOptions = false,
}: {
  isFiltered?: boolean;
  simpleOptions?: boolean;
  isFormattedData?: boolean;
  endPoint?: string;
  method?: string;
  key?: string;
  fieldsToShow?: string[];
  dataPickFromItems?: boolean;
  baseURLType?:
    | ''
    | 'admin'
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
