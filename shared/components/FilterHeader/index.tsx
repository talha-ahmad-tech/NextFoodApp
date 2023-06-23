import { memo, useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import Select from 'react-select';
const FilterHeader = ({ showField = true }: { showField?: boolean }) => {
  const [isActive, setIsActive] = useState(true);
  const [isFilter, setIsFilter] = useState({
    today: false,
    thisWeek: false,
    thisMonth: false,
    yearToDate: false,
    lastThreeMonths: false,
  });

  const buttonclick = () => {
    setIsActive(current => !current);
  };
  return (
    <div className="col-12">
      <SectionWrapper
        className={`${
          isActive
            ? 'height-auto mb-4 p-0'
            : 'pb-4 position-relative height-auto no-wrapper no-bg'
        }`}
      >
        <>
          <div
            className={`${
              isActive
                ? 'custom-flex-end position-relative align-items-start pb-2 p-2'
                : 'pb-4 position-relative'
            }`}
          >
            <button className="wrapper-toggle-btn" onClick={buttonclick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="6.861"
                viewBox="0 0 12 6.861"
                className="arrow-down"
              >
                <path
                  id="Icon_ionic-ios-arrow-down"
                  data-name="Icon ionic-ios-arrow-down"
                  d="M12.19,16.039,16.727,11.5a.854.854,0,0,1,1.211,0,.865.865,0,0,1,0,1.215L12.8,17.858a.856.856,0,0,1-1.183.025L6.438,12.717A.858.858,0,0,1,7.649,11.5Z"
                  transform="translate(18.188 18.108) rotate(180)"
                  fill="#828282"
                ></path>
              </svg>
            </button>
            {isActive ? (
              <div className="custom-flex-start flex-wrap me-5">
                <button
                  onClick={() => {
                    setIsFilter({ ...isFilter, today: !isFilter?.today });
                  }}
                  className={`friday-btn-primary ${
                    isFilter?.today ? '' : 'outline-btn'
                  }   small-btn font-medium m-2`}
                  type="button"
                >
                  Today
                </button>
                <button
                  onClick={() => {
                    setIsFilter({ ...isFilter, thisWeek: !isFilter?.thisWeek });
                  }}
                  className={`friday-btn-primary ${
                    isFilter?.thisWeek ? '' : 'outline-btn'
                  }   small-btn font-medium m-2`}
                  type="button"
                >
                  This Week
                </button>
                <button
                  onClick={() => {
                    setIsFilter({
                      ...isFilter,
                      thisMonth: !isFilter?.thisMonth,
                    });
                  }}
                  className={`friday-btn-primary ${
                    isFilter?.thisMonth ? '' : 'outline-btn'
                  }   small-btn font-medium m-2`}
                  type="button"
                >
                  This Month
                </button>
                <button
                  onClick={() => {
                    setIsFilter({
                      ...isFilter,
                      yearToDate: !isFilter?.yearToDate,
                    });
                  }}
                  className={`friday-btn-primary ${
                    isFilter?.yearToDate ? '' : 'outline-btn'
                  }   small-btn font-medium m-2`}
                  type="button"
                >
                  Year to Date
                </button>
                <button
                  onClick={() => {
                    setIsFilter({
                      ...isFilter,
                      lastThreeMonths: !isFilter?.lastThreeMonths,
                    });
                  }}
                  className={`friday-btn-primary ${
                    isFilter?.lastThreeMonths ? '' : 'outline-btn'
                  }   small-btn font-medium m-2`}
                  type="button"
                >
                  Last 3 months
                </button>
                {showField && (
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={
                        'select-wrapper custom-select-blue small-select-wrapper'
                      }
                    />
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {isActive && showField ? (
            <div
              className={
                // isActive
                // ? 'd-none bottom-section-wrapper p-2 border-t-1'
                // :
                'bottom-section-wrapper p-2 border-t-1'
              }
            >
              <div className="custom-flex-between align-items-start">
                <div className="custom-flex-start flex-wrap">
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                  <div className="m-2">
                    <Select
                      backspaceRemovesValue={true}
                      className={'select-wrapper small-select-wrapper'}
                    />
                  </div>
                </div>
                <div className="custom-flex-left m-2">
                  <Select
                    backspaceRemovesValue={true}
                    className={'select-wrapper small-select-wrapper'}
                  />
                  <div className="custom-flex-start mt-3">
                    <button
                      className="friday-btn-primary outline-btn small-btn font-medium"
                      type="button"
                    >
                      Clear
                    </button>
                    <button
                      className="friday-btn-primary small-btn font-medium ms-2"
                      type="button"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      </SectionWrapper>
    </div>
  );
};
export default FilterHeader;
