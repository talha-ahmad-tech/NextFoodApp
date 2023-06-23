import './Aside.scss';
import Menu, { MenuWLA, MenuSuperAdmin } from './Menu';
import MenuLink from './component/MenuLink';
import UserDropdown from './component/UserDropdown';
interface IAside {
  toggleSidebar: any;
  showSideBar: boolean;
  app?: 'wla' | 'hq' | 'superadmin';
}

const Aside = ({ toggleSidebar, showSideBar, app = 'hq' }: IAside) => {
  const MenuList =
    app === 'hq' ? Menu : app === 'wla' ? MenuWLA : MenuSuperAdmin;
  return (
    <aside
      className={`${
        showSideBar === true
          ? 'custom-sidebar '
          : 'custom-sidebar close-sidebar'
      }`}
    >
      <div className="sidebar-wrapper">
        <UserDropdown showSideBar={showSideBar} />
        <div className="custom-ul-wrapper">
          <ul className="custom-ul-wrapper-main custom-padding-bottom">
            {MenuList.map((menuItem: any) => (
              <MenuLink
                key={menuItem.id}
                menuItem={menuItem}
                showSideBar={showSideBar}
              />
            ))}
          </ul>
        </div>
      </div>
      <ul className="custom-ul-wrapper-main sidebar-collapse-menu-button">
        <li>
          <button className="collapse-btn" onClick={toggleSidebar}>
            <i className="fa fa-angle-double-left" aria-hidden="true"></i>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
