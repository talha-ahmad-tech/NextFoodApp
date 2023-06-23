import { memo, useContext } from 'react';
import { ToggleContext, ToggleDispatchContext, TOGGLE_OPTIONS } from '..';
import './style.scss';

interface IToggleButton {
  isLineDisabled?: boolean;
  toggleTitle?: string;
  toggleTitleTab?: string;
}

const ToggleButton = ({
  isLineDisabled = false,
  toggleTitle = '',
  toggleTitleTab = '',
}: IToggleButton) => {
  const activeTab = useContext(ToggleContext);
  const setActiveTab = useContext(ToggleDispatchContext);

  const onToggle = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <div className="toggle-btn-wrapper">
      <div className="switches-container">
        <div>
          <input
            type="radio"
            id={'header'}
            name="switch"
            checked={activeTab === TOGGLE_OPTIONS.header}
            onClick={() => onToggle(TOGGLE_OPTIONS.header)}
          />
          <label htmlFor="header">
            {toggleTitle?.length ? toggleTitle : 'Header'}
          </label>
        </div>
        <div>
          <input
            type="radio"
            disabled={isLineDisabled}
            id="lines"
            name="switch"
            checked={activeTab === TOGGLE_OPTIONS.lines}
            onClick={() => onToggle(TOGGLE_OPTIONS.lines)}
          />
          <label htmlFor="lines">
            {toggleTitleTab.length ? toggleTitleTab : 'Line'}
          </label>
        </div>
      </div>
    </div>
  );
};

export default memo(ToggleButton);
