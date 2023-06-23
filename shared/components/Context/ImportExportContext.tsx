import React, { createContext, createRef, useRef, useState } from 'react';
import type { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact';

type ImportExportContextType = {
  isModalOpen: boolean;
  isModalLoading: boolean;
};

const ImportExportContext = createContext<ImportExportContextType>({
  isModalOpen: false,
  isModalLoading: false,
});
const SetImportExportContext = createContext<any>({});
const GridContext = createContext<any>(null);

const ImportExportProvider = ({ children }: any) => {
  const gridRef = createRef<AgGridReactType>();

  const [context, setContext] = useState<ImportExportContextType>({
    isModalOpen: false,
    isModalLoading: false,
  });

  return (
    <GridContext.Provider value={gridRef}>
      <ImportExportContext.Provider value={context}>
        <SetImportExportContext.Provider value={setContext}>
          {children}
        </SetImportExportContext.Provider>
      </ImportExportContext.Provider>
    </GridContext.Provider>
  );
};

export {
  ImportExportContext,
  SetImportExportContext,
  ImportExportProvider,
  GridContext,
};
