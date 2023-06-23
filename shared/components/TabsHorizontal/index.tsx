import { useRouter } from 'next/router';
import Link from 'next/link';
import './styles.scss';
import useGetPermissions from '../../customHook/useGetPermissions';
import { IsPermissionGranted } from '../../utils/helper';

interface Tab {
  id: string;
  name: string;
  link: string;
  module: string;
  permissionName?: string;
}
interface ITabsHorizontal {
  tabs: Tab[];
}

const TabsHorizontal = ({ tabs = [] }: ITabsHorizontal) => {
  const { pathname } = useRouter();
  const { permissions } = useGetPermissions();

  const CheckPermissionGranted = (name: string) => {
    return IsPermissionGranted(permissions, name);
  };

  return (
    <>
      <div className="custom-tabs-wrapper-header">
        <div className="container-fluid">
          <ul
            className="nav nav-pills custom-tabs-wrapper-header__list"
            id="pills-tab"
            role="tablist"
          >
            {tabs.map(
              ({ id, name, link, module, permissionName }: Tab, index: any) => {
                if (permissionName) {
                  return (
                    CheckPermissionGranted(permissionName) && (
                      <li key={id} className="nav-item" role="presentation">
                        <Link
                          key={id}
                          className={`nav-link ${
                            pathname.includes(module) ? 'active' : ''
                          }`}
                          type="link"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                          href={link}
                        >
                          {name}
                        </Link>
                      </li>
                    )
                  );
                } else {
                  return (
                    <li key={id} className="nav-item" role="presentation">
                      <Link
                        key={id}
                        className={`nav-link ${
                          pathname.includes(module) ? 'active' : ''
                        }`}
                        type="link"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                        href={link}
                      >
                        {name}
                      </Link>
                    </li>
                  );
                }
              },
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default TabsHorizontal;
