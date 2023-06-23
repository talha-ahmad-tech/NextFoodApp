import React from "react";
import "./index.css";
const TabSteps = ({
  steps,
  activeIndex,
}: {
  steps: string[];
  activeIndex: number;
}) => {
  return (
    <div className="nav flex-column nav-pills vertical-nav-pills">
      {steps.map((label, i) => (
        <div
          key={i}
          className={`nav-link  ${activeIndex === i ? "active" : ""}`}
        >
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default TabSteps;
