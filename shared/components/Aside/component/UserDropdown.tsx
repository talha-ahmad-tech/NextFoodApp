import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import Cookies from 'js-cookie';

const Image = dynamic(() => import('../../Image'), {
  ssr: false,
});
import { useAuth } from 'oidc-react';
import jwt_decode from 'jwt-decode';
import { localstorageService } from '../../../utils';

interface IUserDropdown {
  showSideBar: boolean;
}

const UserDropdown = ({ showSideBar }: IUserDropdown) => {
  let router = useRouter();
  const auth = useAuth();

  const userData: any = auth.userData?.access_token
    ? jwt_decode(auth.userData?.access_token)
    : { given_name: '', role: '' };

  const [showdropdown, setshowdropdown] = useState(false);

  const toggleUserProfile = () => {
    setshowdropdown(!showdropdown);
  };

  const onLogout = () => {
    const env = process.env.NODE_ENV;
    auth.signOut();
    Cookies.remove('token');
    if (env === 'development') {
      window.location.href = 'https://sso.preview.fridaypos.com/';
    } else if (env === 'production') {
      window.location.href = window.location.href.includes('preview')
        ? 'https://sso.preview.fridaypos.com/'
        : 'https://sso.uat.fridaypos.com/';
    }
  };

  return (
    <div
      className={`${
        showdropdown === false
          ? 'custom-dropdown-container-wrapper'
          : 'custom-dropdown-container-wrapper active'
      }`}
    >
      <div className="custom-dropdown-container ">
        <button className="custom-dropdown-button" onClick={toggleUserProfile}>
          <div className="custom-dropdown-head-left">
            <div className="profile-image">
              <Image
                src={'/assets/images/dp.png'}
                className="profile-img"
                alt="Dp Image"
                width={100}
                height={100}
              />
            </div>
            <div className="user-details text-hidden">
              <p className="custom-p-16 font-medium">
                {' '}
                {showSideBar ? userData?.given_name : ''}
              </p>
              <p className="custom-p-14 grey-text">
                {showSideBar ? userData?.role : ''}
              </p>
            </div>
          </div>
          {showSideBar ? (
            <div className="custom-dropdown-head-right text-hidden">
              <i className="fa fa-angle-down"></i>
            </div>
          ) : (
            ''
          )}
        </button>
        <div className="custom-dropdown-body">
          <button className="custom-link-button">
            <span>
              <i className="fa fa-user" aria-hidden="true"></i>
            </span>
            Manage Profile
          </button>
          <button className="custom-link-button" onClick={onLogout}>
            <span>
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default memo(UserDropdown);
