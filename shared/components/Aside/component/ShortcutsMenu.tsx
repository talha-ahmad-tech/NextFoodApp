import { useRouter } from 'next/router';
import { memo } from 'react';

interface IShortcutsMenu {
  showSideBar: boolean;
}

const ShortcutsMenu = ({ showSideBar }: IShortcutsMenu) => {
  const router = useRouter();
  return showSideBar ? (
    <li>
      <ul className="child-menus">
        <li>
          <button
            className="sub-menu-items text-hidden"
            onClick={() => router.push('/reports/salesreports/orderhistory')}
          >
            {'Order History'}
          </button>
        </li>
      </ul>
    </li>
  ) : (
    <></>
  );
};
export default memo(ShortcutsMenu);
