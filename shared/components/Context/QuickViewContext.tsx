import { createContext, useState } from "react";
interface IQuickView {
  show: boolean;
  title: string;
  disabled: boolean;
  colsType?: string;
  param: any;
}
const QuickViewContext = createContext<IQuickView>({
  show: false,
  title: "",
  disabled: false,
  colsType: "",
  param: {},
});

const QuickViewDispatchContext = createContext((conf: IQuickView) => {});

const QuickViewProvider = ({ children }: any) => {
  const [config, setConfig] = useState<IQuickView>({
    show: false,
    title: "",
    disabled: false,
    colsType: "",
    param: {},
  });
  return (
    <QuickViewContext.Provider value={config}>
      <QuickViewDispatchContext.Provider value={setConfig}>
        {children}
      </QuickViewDispatchContext.Provider>
    </QuickViewContext.Provider>
  );
};

export { QuickViewProvider, QuickViewContext, QuickViewDispatchContext };
