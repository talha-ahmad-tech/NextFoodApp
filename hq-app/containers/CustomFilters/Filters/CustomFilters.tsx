/* eslint-disable @typescript-eslint/no-explicit-any */
import { SectionWrapper } from '@fridayfood/shared/components';
import { useState } from 'react';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';

import Preference from '../AddPreferences';
import useUtils from './useUtils';
import AutoComplete from '../AutoCompleteFilter';
import { useEffectAfterMount } from '@fridayfood/shared';
import { DateTimeFilters } from 'components/FilterHeader/DateTimeFilters';

const FilterHeader = ({
  data,
  handleApply,
  handleReset,
  type,
  clearFilter,
  handleDate,
  payload,
  setPayload,
}: any) => {
  const { filters, setFilters, getAllPreferences } = useUtils();
  const [value, setValue] = useState<any>('');
  const [isActive, setIsActive] = useState(true);
  const buttonclick = () => {
    setIsActive(current => !current);
  };

  useEffectAfterMount(() => {
    setFilters({ ...filters, presetName: '', values: [], usePreferences: [] });
  }, [type]);

  return (
    <div className="col-12">
      <Preference />
      <SectionWrapper
        className={`${
          isActive
            ? 'height-auto mb-4 p-0'
            : 'pb-4 position-relative height-auto no-wrapper no-bg'
        }`}
      >
        <>
          <div
            className={`${
              isActive
                ? 'custom-flex-between position-relative align-items-start pb-2 p-2'
                : 'pb-4 position-relative'
            }`}
          >
            <button className="wrapper-toggle-btn" onClick={buttonclick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="6.861"
                viewBox="0 0 12 6.861"
                className="arrow-down"
              >
                <path
                  id="Icon_ionic-ios-arrow-down"
                  data-name="Icon ionic-ios-arrow-down"
                  d="M12.19,16.039,16.727,11.5a.854.854,0,0,1,1.211,0,.865.865,0,0,1,0,1.215L12.8,17.858a.856.856,0,0,1-1.183.025L6.438,12.717A.858.858,0,0,1,7.649,11.5Z"
                  transform="translate(18.188 18.108) rotate(180)"
                  fill="#828282"
                ></path>
              </svg>
            </button>

            {isActive && handleDate ? (
              <div
                style={{
                  width: '95%',
                  justifyContent: 'flex-end',
                  display: 'flex',
                }}
              >
                <div
                  style={{
                    width: '40%',
                    justifyContent: 'flex-end',
                    display: 'flex',
                  }}
                >
                  <DateTimeFilters onFilterChange={handleDate} />
                </div>
              </div>
            ) : null}
          </div>

          {isActive ? (
            <div
              className={`custom-flex-between align-items-start bottom-section-wrapper p-4 pb-3 ${
                handleDate ? 'pt-0' : 'pt-2'
              }`}
            >
              <div className="custom-flex-start flex-wrap">
                {data?.metadata?.map(
                  (
                    item: {
                      active?: string;
                      type?: string;
                      datainfo: { boolean: string };
                    },
                    index: number,
                  ) => {
                    return (
                      <div className={`custom-padding-right`} key={index}>
                        <AutoComplete
                          data={item}
                          component={data?.name}
                          clear={clearFilter}
                          payload={payload}
                          setPayload={setPayload}
                          setValue={setValue}
                          value={value}
                        />
                      </div>
                    );
                  },
                )}
              </div>

              <div className="custom-padding-right">
                <Field
                  isFullWidth
                  id={'prefId'}
                  type={'options'}
                  cacheUniqs={[
                    type,
                    filters?.open,
                    value,
                    value?.length,
                    filters?.userPreferences?.length,
                  ]}
                  label="Preferences"
                  name="preferenceslist"
                  loadOptions={() => getAllPreferences(data?.name)}
                  onChange={(query: any) => {
                    setValue(query);
                    setFilters({
                      ...filters,
                      PresetId: query?.value,
                      presetName: query.name,
                      userPreferences: [],
                    });
                    handleApply(query);
                  }}
                  value={clearFilter ? {} : { label: value?.label }}
                  errorMessage={''}
                  isSearchable
                />
                {/* <Preference /> */}
                <div className="custom-flex-start mt-3">
                  <button
                    className="friday-btn-primary outline-btn small-btn font-medium"
                    type="button"
                    onClick={handleReset}
                  >
                    Clear
                  </button>
                  <button
                    className="friday-btn-primary small-btn font-medium ms-2"
                    type="button"
                    onClick={() => setFilters({ ...filters, open: true })}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </>
      </SectionWrapper>
    </div>
  );
};
export default FilterHeader;
