import { memo } from 'react';
import './style.scss';

interface ITabsHeader {
  Tabs: object[];
  activeIndex?: number;
  getActiveTab?: (tab: any) => void;
}
const TabsHeader = ({
  Tabs = [],
  activeIndex = -1,
  getActiveTab = () => {},
}: ITabsHeader) => {
  return (
    <>
      <div className="nav flex-column nav-pills vertical-nav-pills">
        {Tabs?.map((item: any, index: number) => {
          return Object.keys(item)?.length ? (
            <button
              key={item.id}
              disabled={activeIndex !== -1 && activeIndex !== index}
              className={`nav-link  ${
                activeIndex !== -1
                  ? activeIndex === index
                    ? 'active'
                    : ''
                  : item.classes
              }`}
              id="v-pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target={'#' + item.id}
              type="button"
              onClick={() => getActiveTab(item)}
            >
              <span
                className={`circle-wrapper  ${
                  activeIndex === index ? 'active' : ''
                }`}
              ></span>
              {Object.keys(item)?.length && item.label}
            </button>
          ) : null;
        })}
      </div>
    </>
  );
};

export default memo(TabsHeader);
