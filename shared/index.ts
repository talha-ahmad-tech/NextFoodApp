// import withRedux from './components/ReduxStoreHOC';
import useEffectAfterMount from './customHook/useEffectAfterMount';
import useEffectAfterSuccess from './customHook/useEffectAfterSuccess';
import MOCK_DATA from './utils/MOCK_DATA.json';
import CustomSwitchRenderer from './components/CustomSwitchButton';
import { CurrencyFormator, DateFormator } from './utils/helper';

export {
  CurrencyFormator,
  DateFormator,
  MOCK_DATA,
  //Redux Store
  // withRedux,
  //Custom Hooks
  useEffectAfterMount,
  useEffectAfterSuccess,
  CustomSwitchRenderer,
};
