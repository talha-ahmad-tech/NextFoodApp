import SectionWrapper from '../SectionWrapper';
import { Icon } from '../Icon';
import React from 'react';
import { DoughnutChart } from '../Workspace/Charts';

export const WorkspaceCard = () => {
  return (
    <div className="col-12 pb-4">
      <SectionWrapper className="small-box dashboard-chart-wrapper">
        <div className="chart-inner-wrapper fullHeight">
          <DoughnutChart noLabels />
        </div>
        <div className="charts-data-wrapper">
          <div className="charts-data-wrapper-inner">
            <p className="font-bold">64</p>
            <span className="custom-p-11 font-medium">Turnover Ratio</span>
            <span className="custom-round-dot blue-dot"></span>
          </div>
          <div className="charts-data-wrapper-inner">
            <p className="font-bold">25</p>
            <span className="custom-p-11 font-medium">Total Payable</span>
            <span className="custom-round-dot orange-dot"></span>
          </div>
          <div className="charts-data-wrapper-inner">
            <p className="font-bold">11</p>
            <span className="custom-p-11 font-medium">Processed Payments</span>
            <span className="custom-round-dot red-dot"></span>
          </div>
          <div className="charts-data-wrapper-inner">
            <p className="font-bold">36</p>
            <span className="custom-p-11 font-medium">Overdue Payments</span>
            <span className="custom-round-dot pink-dot"></span>
          </div>
          <div className="charts-data-wrapper-inner">
            <p className="font-bold">84</p>
            <span className="custom-p-11 font-medium">Invoices in Review</span>
            <span className="custom-round-dot light-grey-dot"></span>
          </div>
          <div className="charts-data-wrapper-inner">
            <p className="font-bold grey-color">0</p>
            <span className="custom-p-11 font-medium">Pending to Invoice</span>
            <span className="custom-round-dot dark-grey-dot"></span>
          </div>
        </div>
        {/* <div className="icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18.721"
            height="12.881"
            viewBox="0 0 18.721 12.881"
          >
            <path
              id="Path_63961"
              data-name="Path 63961"
              d="M204.619,246.36H189.271a1.688,1.688,0,0,0-1.686,1.687v9.508a1.688,1.688,0,0,0,1.687,1.687h15.347a1.689,1.689,0,0,0,1.687-1.687v-9.508a1.689,1.689,0,0,0-1.687-1.687Zm-7.674,11.378a4.938,4.938,0,1,1,4.938-4.937A4.943,4.943,0,0,1,196.945,257.738Zm.089-6.941a.644.644,0,0,1,.523.234,1.079,1.079,0,0,1,.2.709h1.14a1.91,1.91,0,0,0-.4-1.252,1.645,1.645,0,0,0-1.092-.582v-.857h-.632v.844a1.8,1.8,0,0,0-1.132.5,1.479,1.479,0,0,0-.427,1.092,1.653,1.653,0,0,0,.123.667,1.467,1.467,0,0,0,.348.487,2.433,2.433,0,0,0,.534.368,7.614,7.614,0,0,0,.741.32,1.631,1.631,0,0,1,.609.353.724.724,0,0,1,.18.515.639.639,0,0,1-.2.5.782.782,0,0,1-.548.183.814.814,0,0,1-.642-.251,1.048,1.048,0,0,1-.221-.72H195a1.845,1.845,0,0,0,.445,1.3,1.9,1.9,0,0,0,1.251.574v.78h.627v-.785a1.838,1.838,0,0,0,1.152-.493,1.472,1.472,0,0,0,.417-1.088,1.645,1.645,0,0,0-.111-.629,1.474,1.474,0,0,0-.319-.481,2.133,2.133,0,0,0-.513-.379,7.12,7.12,0,0,0-.775-.357,1.924,1.924,0,0,1-.645-.37.676.676,0,0,1-.172-.481.7.7,0,0,1,.178-.507.673.673,0,0,1,.5-.182Z"
              transform="translate(-187.585 -246.36)"
              fill="#0b77e3"
            />
          </svg>
        </div>
        <div className="py-3 px-1">
          <p className="custom-p-16 dark-grey-clr">Total Account Payable</p>
          <h5 className="font-bold">86,000,000,000</h5>
        </div>
        <div className="custom-flex-end ">
          <button className="light-blue-link custom-p-10">
            VIEW ALL
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5.968"
              height="9.206"
              viewBox="0 0 5.968 9.206"
            >
              <path
                id="Path_2068"
                data-name="Path 2068"
                d="M151.05,240.368a.885.885,0,0,1,.25-.613.871.871,0,0,1,1.226,0l2.625,2.617,2.625-2.625A.867.867,0,0,1,159,240.972l-3.238,3.238a.855.855,0,0,1-.613.25.892.892,0,0,1-.613-.25l-3.238-3.23A.9.9,0,0,1,151.05,240.368Z"
                transform="translate(-239.493 159.256) rotate(-90)"
                fill="#aac0de"
              />
            </svg>
          </button>
        </div> */}
      </SectionWrapper>
    </div>
  );
};
