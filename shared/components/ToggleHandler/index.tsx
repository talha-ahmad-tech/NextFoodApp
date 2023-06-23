import { memo, useContext } from "react";
import { ToggleContext, TOGGLE_OPTIONS } from "..";

interface IToggleHandler {
  Header: any;
  Lines: any;
}

const ToggleHandler = ({
  Header = <></>,
  Lines = <></>
}: IToggleHandler) => {
  const activeTab = useContext(ToggleContext);

  
  return activeTab === TOGGLE_OPTIONS.header ? (
   <Header />
  ) : (
    <Lines />
  )
};

export default memo(ToggleHandler);
