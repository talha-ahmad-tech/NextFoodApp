import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDropDownData } from './getOptionsHelper';

const { _env_ } = window as any;
export const BASEURL = _env_?.REACT_APP_BASE_URL_V2;

export const useGetOptions = () => {
  const [placeholders, setPlaceholders] = useState<any>({});
  const [loadedOptionsFor, setLoadOptionsFor] = useState<any>({});
  const dispatch = useDispatch();

  interface IGetOptions {
    api: any; // the api to call
    key: string; // key is used for hiding place holders. this must be the name of the field
    fieldsToShow: any; // an array of the fields to display
    v2?: boolean; // boolean used for apis in v2
    dataPickFromItems?: boolean; // if the return data is in items field send this flag true
    params?: any; // an object to of params sent to server
    filterKey?: string; // key which is to be filtered from response: e.g   list[filterKey]
    filterMatchKey?: string; //key that should be matched with filyterKey  e.g: e.g   list[filterKey]===filterMatchKey
  }

  const getOptions =
    ({
      api,
      key,
      fieldsToShow,
      v2,
      dataPickFromItems = false,
      params = {},
      filterKey,
      filterMatchKey,
    }: IGetOptions) =>
    async () => {
      try {
        let options: { [key: string]: any }[] = [];
        const config = v2
          ? {
              url: api,
              params: params,
              baseUrl: BASEURL,
            }
          : {
              url: api,
              params,
            };
        const { status, data }: any = await getDropDownData(dispatch, config);
        if (status === 200) {
          if (dataPickFromItems) {
            options = data?.result?.items;
          } else {
            options = data?.result;
          }
          options = options?.map((item: { [key: string]: any }, i: number) => {
            let label = item.name;
            fieldsToShow?.map((field: any, index: number) =>
              index === 0
                ? (label = item[field])
                : (label = label + ' ~ ' + item[field]),
            );
            return {
              ...item,
              label,
              value: item.id,
            };
          });
          setLoadOptionsFor({ ...loadedOptionsFor, [key]: true });
          return {
            options:
              filterKey && filterMatchKey
                ? options?.filter(
                    (item: any) => item[filterKey] === filterMatchKey,
                  )
                : options,
            hasMore: false,
          };
        } else {
          return {
            options: [],
            hasMore: false,
          };
        }
      } catch (error) {
        return {
          options: [],
          hasMore: false,
        };
      }
    };
  return {
    getOptions,
    placeholders,
    setPlaceholders,
    loadedOptionsFor,
    setLoadOptionsFor,
    getDropDownData,
  };
};
