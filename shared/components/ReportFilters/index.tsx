import SectionWrapper from '../SectionWrapper';
import { Field } from '@fridayfood/ui-toolkit';

type Item = {
  label: string;
  options?: any;
  onChange: any;
};

interface IReportFilters {
  onBtnClick?: () => void;
  onBtnClickClear?: () => void;
  items?: Item[];
}

const ReportFilters = ({
  onBtnClick,
  items = [],
  onBtnClickClear,
}: IReportFilters) => {
  return (
    <div className="po-wrapper-style mb-3">
      <SectionWrapper className="height-auto">
        <div className="row">
          {items.map((item: Item) => (
            <div className="col-sm-12 col-md-4 col-lg-3 col-xl-2 py-2">
              <Field {...item} isFullWidth />
            </div>
          ))}

          <div className="col-sm-12 d-flex justify-content-end items-center">
            <button
              className="friday-btn-primary friday-btn-md font-medium ms-2"
              onClick={onBtnClickClear}
            >
              Clear
            </button>

            <button
              className="friday-btn-primary friday-btn-md font-medium ms-2"
              onClick={onBtnClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11.427"
                height="11.962"
                viewBox="0 0 11.427 11.962"
                className="me-2"
              >
                <defs>
                  <clipPath id="clip-path">
                    <path
                      id="Path_65138"
                      data-name="Path 65138"
                      d="M146,139.21h11.427v11.962H146Z"
                      transform="translate(0 0)"
                      fill="#fff"
                    />
                  </clipPath>
                </defs>
                <g
                  id="Group_10331"
                  data-name="Group 10331"
                  transform="translate(-146 -139.21)"
                  clip-path="url(#clip-path)"
                >
                  <path
                    id="Path_65137"
                    data-name="Path 65137"
                    d="M155.09,149.894v.525a.735.735,0,1,0,1.469,0v-2.163s0-.005,0-.008a.75.75,0,0,0-.262-.564.725.725,0,0,0-.466-.175H153.7a.748.748,0,0,0-.086,1.488,4.154,4.154,0,0,1-1.589.314,4.268,4.268,0,0,1-4.231-4.3.735.735,0,1,0-1.47,0,5.751,5.751,0,0,0,5.7,5.794,5.607,5.607,0,0,0,3.068-.911Zm-7.606-7.759a.75.75,0,0,0,.262.564.724.724,0,0,0,.466.175h2.136a.748.748,0,0,0,.086-1.489,4.154,4.154,0,0,1,1.589-.314,4.268,4.268,0,0,1,4.231,4.3.735.735,0,1,0,1.47,0,5.751,5.751,0,0,0-5.7-5.794,5.607,5.607,0,0,0-3.068.911v-.525a.735.735,0,1,0-1.47,0v2.163s0,.005,0,.008Z"
                    transform="translate(-0.313 -0.007)"
                    fill="#fff"
                    fillRule="evenodd"
                  />
                </g>
              </svg>
              Update
            </button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default ReportFilters;
