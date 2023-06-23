import SectionWrapper from "../SectionWrapper";

import { memo, useState } from "react";
import { Icon } from "../Icon";

export const CollapseWrapper = () => {
    const [isActive, setIsActive] = useState(false);

    const buttonclick = () => {
      setIsActive(current => !current);
    };
  return (
        <div  className={isActive ? 'hidden-text mt-4 collapse-wrapper' : ' collapse-wrapper mt-4'}>
            <SectionWrapper className="height-auto">
                <h1>Section Wrapper</h1>
            </SectionWrapper>
            <button className="wrapper-toggle-btn" onClick={buttonclick}>
            <Icon  variant="arrowdown" className="arrow-down"/>
            </button>
      </div>
  );
};
