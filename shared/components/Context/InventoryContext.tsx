import React, { createContext, useState } from 'react';
const InventoryContext = createContext<any>({});
const InventoryDispatchContext = createContext<any>({});

const InventoryProvider = ({ children }: any) => {
  const [lines, setLines] = useState({
    allLines: [],
    ingredientsLines: [],
    packagingMaterialLines: [],
    showReasonColumns: false,
  });
  return (
    <InventoryContext.Provider value={lines}>
      <InventoryDispatchContext.Provider value={setLines}>
        {children}
      </InventoryDispatchContext.Provider>
    </InventoryContext.Provider>
  );
};

export { InventoryProvider, InventoryContext, InventoryDispatchContext };
