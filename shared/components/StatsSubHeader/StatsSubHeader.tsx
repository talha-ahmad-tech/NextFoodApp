import React from "react";
import  './StatsSubHeader.scss';

const StatsSubHeader = () => {
  return (
    <div className="statstabswrapper py-5">
      <div className="row align-items-start custom-border-radius m-0">
        <div className="col p-4">
          <div className="text-center border-end border-warning">
            <p>Total Units:</p>
            <h6 >325</h6>
          </div>
        </div>
        <div className="col p-4">
          <div className="text-center border-end border-warning">
            <p>Net Amount:</p>
            <h6>325</h6>
          </div>
        </div>
        <div className="col p-4">
          <div className="text-center border-end border-warning">
            <p>Charges Amount:</p>
            <h6>325</h6>
          </div>
        </div>
        <div className="col p-4">
          <div className="text-center border-end border-warning">
            <p>Line Discount:</p>
            <h6>325</h6>
          </div>
        </div>
        <div className="col p-4">
          <div className="text-center border-end border-warning">
            <p>Total Discount:</p>
            <h6>325</h6>
          </div>
        </div>
        <div className="col p-4">
          <div className="text-center border-end border-warning">
            <p>Tax Amount:</p>
            <h6>325</h6>
          </div>
        </div>
        <div className="col p-4">
          <div className="text-center">
            <p>Total Amount:</p>
            <h6>325</h6>
          </div>
        </div>
      </div>
      </div>
  );
};

export default StatsSubHeader;
