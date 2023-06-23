import { createContext, useState } from 'react';

const TOGGLE_OPTIONS: {
  header: number;
  lines: number;
} = {
  header: 0,
  lines: 1,
};
const AllLinesContext = createContext<any>({});
const SetAllLinesContext = createContext<any>({});

const ToggleContext = createContext(0);
const ToggleDispatchContext = createContext((active: number) => {});

const ToggleProvider = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState<any>(TOGGLE_OPTIONS.header);

  const [linesSelected, setLinesSelected] = useState<any>({
    lineRows: [],
    getProducts: [],
    getvariants: [],
    formattedHeader: {},
    availableProductVariants: [],
    procurementCategory: [],
    getLines: [],
    show: false,
  });
  return (
    <AllLinesContext.Provider value={linesSelected}>
      <SetAllLinesContext.Provider value={setLinesSelected}>
        <ToggleContext.Provider value={activeTab}>
          <ToggleDispatchContext.Provider value={setActiveTab}>
            {children}
          </ToggleDispatchContext.Provider>
        </ToggleContext.Provider>
      </SetAllLinesContext.Provider>
    </AllLinesContext.Provider>
  );
};

export {
  ToggleProvider,
  ToggleContext,
  ToggleDispatchContext,
  AllLinesContext,
  SetAllLinesContext,
};

export default ToggleProvider;
