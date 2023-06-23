import './style.scss';
import CustomDropdown from '../CustomDropdown';
import ToggleButton from '../ToggleButton';
import { memo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IListHeaderWrapper {
  title?: string;
  id?: string;
  showToggleButton?: boolean;
  isLineDisabled?: boolean;
  mainMenu?: any;
  disabled?: boolean;
  subHeader?: any;
  toggleTitleTab?: string;
  toggleTitle?: string;
  isBackBtnRequired?: boolean;
}
const ListHeaderWrapper = ({
  title,
  id,
  showToggleButton = false,
  isLineDisabled = false,
  mainMenu,
  disabled = false,
  subHeader,
  toggleTitleTab = '',
  toggleTitle = '',
  isBackBtnRequired = false,
}: IListHeaderWrapper) => {
  const router = useRouter();
  return (
    <div className="col-12 custom-flex-between mobile-col-resp">
      <div className="custom-flex-col custom-header-wrapper">
        <div className="custom-flex-start">
          {isBackBtnRequired && (
            <Image
              src={'/assets/images/svgs/ArrowUp.svg'}
              alt={''}
              height={15}
              width={25}
              style={{
                transform: 'rotate(90deg)',
                marginTop: 12,
                cursor: 'pointer',
                paddingRight: 10,
              }}
              onClick={() => router.back()}
            />
          )}

          <div className="pe-4 mb-3">
            <h3>
              <span className="font-viewTitle">{title}</span>
              {subHeader ? (
                <span className="font-regular border-left-1 ps-4 ms-4">
                  {subHeader}
                </span>
              ) : null}
            </h3>

            {id && (
              <div className="custom-flex-center custom-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6.903"
                  height="8.143"
                  viewBox="0 0 6.903 8.143"
                >
                  <path
                    id="Path_2061"
                    data-name="Path 2061"
                    d="M220.09,188.311v-4.7H213.2v8.143h4.419a2.519,2.519,0,0,0,2.471-2.825h-.626v.006h-2.192v2.192h-3.445v-6.89h5.637v4.074h.626Zm-2.192,1.25h1.544A1.855,1.855,0,0,1,217.9,191.1Zm.313-3.758h-3.132v-.626h3.132Zm-3.132.94h3.132v.626h-3.132Z"
                    transform="translate(-213.2 -183.61)"
                  />
                </svg>
                <span className="custom-p-10 brand-color">{id}</span>
              </div>
            )}
          </div>
          {showToggleButton && (
            <div className="ps-4 border-left-1">
              <ToggleButton
                toggleTitle={toggleTitle}
                toggleTitleTab={toggleTitleTab}
                isLineDisabled={isLineDisabled}
              />
            </div>
          )}
        </div>
      </div>
      {Boolean(mainMenu) && (
        <div className="custom-flex-start">
          {mainMenu.map(
            ({
              title,
              subMenu,
              id,
              onClick,
            }: {
              title: string;
              active: boolean;
              subMenu: any;
              id: string;
              onClick?: any;
            }) => (
              <div className="px-2">
                <CustomDropdown title={title} items={subMenu} className={id} />
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};
export default memo(ListHeaderWrapper);
