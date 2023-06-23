import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Icon } from '../Icon';
import SectionWrapper from '../SectionWrapper';
import './style.scss';
import CustomDropdown from '../CustomDropdown';
import Action from '../Svgs/Actions';
import Download from '../Svgs/Download';
import ExcelImport from '../Svgs/ExcelImport';
import ExportIcon from '../Svgs/ExportIcon';
import ImportExportFiles from '../ImportExportFiles';
interface Tab {
  id: string;
  name: string;
  classes: string;
  module: any;
  title?: string;
}
interface ITabsVertical {
  callBack?: () => void;
  tabs: Tab[];
  isNonWrap?: boolean;
  btnTitle?: string;
  onClick?: any;
  initialPath: string;
  noMargin?: string;
  noBorder?: string;
  saveButton?: boolean;
  saveClick?: any;
  onFilePick?: (file: File) => void;
  refreshClick?: any;
  fileUploading?: boolean;
  importOptionRequired?: boolean;
}

const TabsVertical = ({
  tabs = [],
  isNonWrap = false,
  btnTitle = '',
  onClick = () => {},
  initialPath = '',
  noMargin = 'false',
  noBorder = 'false',
  saveButton = false,
  saveClick = () => {},
  refreshClick = () => {},
  callBack = () => {},
  importOptionRequired = false,
}: ITabsVertical) => {
  useLayoutEffect(() => {
    if (callBack) {
      callBack();
    }
  }, []);

  const [path] = useState<any>(initialPath);
  const location = useRouter();

  return (
    <SectionWrapper className="tabs-wrapper-style">
      <div className="vertical-tabs-wrapper">
        <div
          className={`${
            noBorder
              ? 'custom-tabs-wrapper-header vertical-tabs-wrapper-inner border-0'
              : 'custom-tabs-wrapper-header vertical-tabs-wrapper-inner'
          }`}
        >
          <div
            className={`${
              noMargin ? 'custom-flex-between ' : 'custom-flex-between mb-4'
            }`}
          >
            <ul
              className="nav nav-pills custom-tabs-wrapper-header__list"
              id="pills-tab"
              role="tablist"
            >
              {tabs.map(({ id, name, classes, title }: Tab, index: any) => (
                <li key={index} className="nav-item" role="presentation">
                  <button
                    key={id}
                    className={`nav-link ${
                      location.pathname.includes(name) ? 'active' : ''
                    }`}
                    id={`${name}-tabs`}
                    data-bs-toggle="pill"
                    data-bs-target={`#${name}`}
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    onClick={() => {
                      location.push(`${path}/${name}`);
                    }}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
            <div className="custom-flex-start align-items-center">
              {saveButton && (
                <>
                  <span onClick={refreshClick} style={{ cursor: 'pointer' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="icon-reset-device"
                      width="22.982"
                      height="22.982"
                      viewBox="0 0 22.982 22.982"
                    >
                      <path
                        id="icon-reset-device-2"
                        data-name="icon-reset-device"
                        d="M5.979,4.8A11.492,11.492,0,0,1,22.9,20.087l-3.666-6.6h3.447A9.193,9.193,0,0,0,7.125,6.858L5.979,4.8ZM21,22.187A11.492,11.492,0,0,1,4.08,6.9l3.666,6.6H4.3a9.193,9.193,0,0,0,15.559,6.633Z"
                        transform="translate(-2 -2)"
                        fill="#0b77e3"
                      />
                    </svg>
                  </span>
                  {/* </button> */}
                  <button
                    className="friday-btn-primary friday-btn-md font-medium ms-2"
                    onClick={saveClick}
                    type="button"
                  >
                    Save
                  </button>
                </>
              )}
              <>
                {btnTitle ? (
                  <button
                    className="friday-btn-primary friday-btn-md font-medium ms-2"
                    onClick={onClick}
                    type="button"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="5.586"
                        height="5.387"
                        viewBox="0 0 5.586 5.387"
                      >
                        <path
                          id="Path_2060"
                          data-name="Path 2060"
                          d="M.618-2.621H2.884v2.17H3.932v-2.17H6.2V-3.668H3.932v-2.17H2.884v2.17H.618Z"
                          transform="translate(-0.618 5.838)"
                          fill="#0b77e3"
                        />
                      </svg>
                    </span>
                    {btnTitle}
                  </button>
                ) : null}
                {importOptionRequired && <ImportExportFiles />}
              </>
            </div>
          </div>
        </div>

        <div className="custom-tabs-wrapper-content">
          <div className="py-0">
            <div
              className="tab-content custom-tabs-wrapper-content__content"
              id="pills-tabContent"
            >
              {tabs.map(({ module, name }: Tab, index: any) => (
                <div key={name}>
                  <div
                    className={`tab-pane fade ${
                      location.pathname.includes(name) ? 'show active' : ''
                    }`}
                    id={name}
                    role="tabpanel"
                    aria-labelledby={`${name}-tab`}
                  >
                    {module}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
export default TabsVertical;
