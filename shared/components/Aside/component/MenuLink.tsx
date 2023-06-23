import { useState, memo, useRef } from 'react';
import ToolTip from 'react-portal-tooltip';
import Link from 'next/link';
import { Icon, IconVariant } from '../../Icon';
import { useRouter } from 'next/router';
export interface IMenuItem {
  name: string;
  id: string;
  icon: IconVariant | string;
  link: string;
  root: string;
}

interface IMenuLink {
  menuItem: IMenuItem;
  showSideBar: boolean;
}
interface Icons extends Record<string, any> {
  icon?: string;
}
const MenuLink = ({ menuItem, showSideBar }: IMenuLink) => {
  const toolTipRef = useRef(null);
  const [isTooltipActive, setisTooltipActive] = useState(false);
  const { name, id, link, root, icon } = menuItem || {};
  const { pathname } = useRouter();

  const showTooltip = () => {
    setisTooltipActive(true);
  };
  const hideTooltip = () => {
    setisTooltipActive(false);
  };

  return (
    <li>
      <Link
        className={`custom-button-transparent ${
          pathname.includes(root) ? 'active-tab' : ''
        }`}
        data-bs-toggle="tooltip"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        id={id}
        href={link}
      >
        <span>
          <Icon variant={icon as unknown as string} />
        </span>
        <span className="text-hidden">{showSideBar ? name : ''}</span>
      </Link>
      {!showSideBar && (
        <ToolTip
          ref={toolTipRef}
          active={isTooltipActive}
          position="right"
          arrow="center"
          parent={`#${id}`}
        >
          {name}
        </ToolTip>
      )}
    </li>
  );
};
export default memo(MenuLink);
