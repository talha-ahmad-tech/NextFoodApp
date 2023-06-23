import { createContext, useState } from 'react';
const ProductsContext = createContext<any>({});
const ProductsDispatchContext = createContext<any>({});
const ActiveIndexContext = createContext<any>({});

const ProductsProvider = ({ children }: any) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [lines, setLines] = useState({
    productModifierDetails: [],
    detailsLines: [],
    recipesLines: [],
    ingredients: [],
    packingMaterial: [],
    all: [],
    productModifiers: [],
    dealsModifiers: [],
    subValues: [[]],
    priceRowData: [
      {
        tax: 0,
        dealPriceType: 1,
        dealName: '',
        costPrice: 0,
        salePrice: 0,
        inTakeMargin: 0,
        profit: 0,
      },
      {
        tax: 0,
        dealPriceType: 2,
        dealName: '',
        costPrice: 0,
        salePrice: 0,
        inTakeMargin: 0,
        profit: 0,
      },
      {
        tax: 0,
        dealPriceType: 3,
        dealName: '',
        costPrice: 0,
        salePrice: 0,
        inTakeMargin: 0,
        profit: 0,
      },
    ],
    cost: {
      cost: 0,
      componentCost: 0,
      tax: 0,
      profit: 0,
      margin: 0,
      salePrice: 0,
      quantity: 0,
      collectionCost: 0,
      eatInCost: 0,
      deliveryCost: 0,
      grossProfit: 0,
      grossMargin: 0,
    },
    id: 0,
  });
  return (
    <ActiveIndexContext.Provider value={{ activeIndex, setActiveIndex }}>
      <ProductsContext.Provider value={lines}>
        <ProductsDispatchContext.Provider value={setLines}>
          {children}
        </ProductsDispatchContext.Provider>
      </ProductsContext.Provider>
    </ActiveIndexContext.Provider>
  );
};

export {
  ProductsProvider,
  ProductsContext,
  ProductsDispatchContext,
  ActiveIndexContext,
};
