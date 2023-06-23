import { createContext, useState } from "react";
import { MODAL_OPTIONS } from "..";

const ModalContext = createContext(false);
const ModalDispatchContext = createContext((value: boolean) => {});

const ModalProvider = ({ children }: any) => {
  const [active, setActive] = useState(MODAL_OPTIONS.inActive);
  return (
    <ModalContext.Provider value={active}>
      <ModalDispatchContext.Provider value={setActive}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
};

export { ModalProvider, ModalContext, ModalDispatchContext };
