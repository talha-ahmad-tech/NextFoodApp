import React, { createContext, useState } from 'react';

const FiltersListContext = createContext<any>({});
const SetFiltersListContext = createContext<any>({});

const FiltersListProvider = ({ children }: any) => {
  const [filtersQuerty, setFiltersQuery] = useState<any>({});
  return (
    <FiltersListContext.Provider value={filtersQuerty}>
      <SetFiltersListContext.Provider value={setFiltersQuery}>
        {children}
      </SetFiltersListContext.Provider>
    </FiltersListContext.Provider>
  );
};

export { FiltersListContext, SetFiltersListContext, FiltersListProvider };
