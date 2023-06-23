import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import useUtils from './Filters/useUtils';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import { useRouter } from 'next/router';

interface IValues {
  label?: string;
  value?: string;
  colId?: string;
  type?: string;
  filter?: string;
}

const activeOptions = [
  {
    label: ' Active',
    name: ' Active',
    value: 'true',
    type: 'Dropdown',
    filter: 0,
    colId: 'Active',
  },
  {
    label: ' In-Active',
    name: ' In-Active',
    value: 'false',
    type: 'Dropdown',
    filter: 0,
    colId: 'Active',
  },
];

const recipeOptions = [
  {
    label: ' Active',
    name: ' Active',
    value: 'true',
    type: 'Dropdown',
    filter: 0,
    colId: 'RecipeId',
    extra: 1,
  },
  {
    label: ' In-Active',
    name: ' In-Active',
    value: 'false',
    type: 'Dropdown',
    filter: 0,
    colId: 'RecipeId',
    extra: 1,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AutoComplete = ({
  data,
  clear,
  payload,
  setPayload,
  component,
  setValue,
  value,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const router = useRouter();

  const { Name, ...rest } = router?.query || {};

  const handleOptionLoader = async (search?: string) => {
    const response = await optinsLoader({
      search,
      url: data?.datainfo?.apiurl,
      colId: data?.colId,
      type: data?.type,
      params: data?.datainfo?.params,
      baseUrl: data?.module,
    });
    return { options: response?.options };
  };

  const {
    optinsLoader,
    handleChangeFilter,
    filters,
    setFilters,
    setFiltersQuery,
  } = useUtils();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialValue: IValues = {
    label: `${Name}` ?? '',
    value: `${Object.values(rest).toString()}`,
    colId: `${Object.keys(rest).toString()}`,
    type: 'Dropdown',
    filter: '0',
  };

  const [values, setValues] = useState<IValues[]>([]);
  const [preValues, setPreValues] = useState<IValues[]>([initialValue]);

  useEffect(() => {
    if (payload?.clearFilter) {
      setValue('');
      setFilters({ userPreferences: [], FilterQuery: {} });
      setFiltersQuery({ FilterQuery: {} });
      setValues([]);
      setPreValues([]);
    }
  }, [payload?.clearFilter]);

  return (
    <>
      {data?.datainfo?.boolean === 'true' && data?.active === 'true' ? (
        <div className="row">
          <label className="col-12 col-form-label">{data?.label}</label>
          <Field
            type="select"
            name={data?.name}
            options={data?.colId === 'Active' ? activeOptions : recipeOptions}
            onChange={(e: IValues[]) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              handleChangeFilter(e as any, data?.colId, component);
              setValues(e);
              setPayload({ ...payload, clearFilter: false });
              setValue();
              setPreValues(e);
            }}
            className={'custom-width'}
            isFullWidth
            clear
            closeMenuOnSelect
            deafultInputValue={
              (filters?.userPreferences?.length && !clear) || !value?.label
                ? values
                : {}
            }
          />
        </div>
      ) : data?.active === 'true' ? (
        <div className="row">
          <label className="col-12 col-form-label">{data?.label}</label>
          <AsyncPaginate
            id="AutoCompleteId"
            loadOptions={handleOptionLoader}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => {
              handleChangeFilter(e, data?.colId, component);
              setValues(e);
              setPayload({ ...payload, clearFilter: false });
              setValue();
              setPreValues(e);
            }}
            cacheUniqs={[filters?.userPreferences?.length]}
            isSearchable={data?.isSearchable === 'true' ? true : false}
            debounceTimeout={500}
            isMulti={data?.multipleSelect === 'true' ? true : false}
            value={
              !value?.label || (filters?.userPreferences?.length && !clear)
                ? data?.colId === Object?.keys(rest)?.toString()
                  ? preValues
                  : values
                : []
            }
            inputValue={
              !value?.label || (filters?.userPreferences?.length && !clear)
                ? data?.colId === Object?.keys(rest)?.toString()
                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (preValues as any)
                  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (values as any)
                : []
            }
          />
        </div>
      ) : null}
    </>
  );
};

export default AutoComplete;
