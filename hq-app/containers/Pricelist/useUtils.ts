import {
  ToggleContext,
  ToggleDispatchContext,
  AllLinesContext,
  SetAllLinesContext,
} from '@fridayfood/shared/components/Context/ToggleContext';
import { useContext } from 'react';
const useUtils = () => {
  const setLinesSelected = useContext(SetAllLinesContext);
  const linesSelected = useContext(AllLinesContext);

  const setActiveTab = useContext(ToggleDispatchContext);
  const activeTab = useContext(ToggleContext);

  return {
    linesSelected,
    setLinesSelected,
    activeTab,
    setActiveTab,
  };
};

export default useUtils;
