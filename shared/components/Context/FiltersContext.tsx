import { createContext, useState } from 'react';

type FilterContextType = {
  values: any;
  savedFilters: Object;
  fetchedFilters: { name: string };
  currentFilters: Object;
  FilterQuery: Object;
  currentQuery: { colId: string };
  refs: Object;
  params: Object;
  open: boolean;
  currentDropdown: Object;
  currentAutoComplete: Object;
  filterKey: string;
  userPreferences: Array<any>;
  PresetId: string;
  presetName: string;
  component?: string;
};

const FiltersContext = createContext<FilterContextType>({
  values: [],
  savedFilters: {},
  fetchedFilters: {
    name: '',
  },
  currentFilters: {},
  FilterQuery: {},
  currentQuery: {
    colId: '',
  },
  refs: {},
  params: {},
  open: false,
  currentDropdown: {},
  currentAutoComplete: {},
  filterKey: '',
  userPreferences: [],
  PresetId: '',
  presetName: '',
  component: '',
});

const SetFiltersContext = createContext<any>({});

const FiltersProvider = ({ children }: any) => {
  const [filters, setFilters] = useState<FilterContextType>({
    values: [],
    savedFilters: {},
    fetchedFilters: { name: '' },
    currentFilters: {},
    FilterQuery: {},
    currentQuery: { colId: '' },
    refs: {},
    params: {},
    open: false,
    currentDropdown: {},
    currentAutoComplete: {},
    filterKey: '',
    userPreferences: [],
    PresetId: '',
    presetName: '',
    component: '',
  });

  return (
    <FiltersContext.Provider value={filters}>
      <SetFiltersContext.Provider value={setFilters}>
        {children}
      </SetFiltersContext.Provider>
    </FiltersContext.Provider>
  );
};

export { FiltersContext, SetFiltersContext, FiltersProvider };
