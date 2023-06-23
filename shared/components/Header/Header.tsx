import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import './Header.scss';
import useOutsideAlerter from '../CustomHooks';

import { Icon } from '../Icon';
const Image = dynamic(() => import('../Image'), {
  ssr: false,
});

const Header = ({ showSideBar, setShowSideBar }: any) => {
  const [isActive, setIsActive] = useState(false);
  // const [sidebarActive,isSidebarActive] =useState(false);
  const [hide, setHide] = useState<any>({
    hideProfile: false,
    hideNotification: false,
  });
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setHide({
      hideProfile: false,
      hideNotification: false,
    });
  });

  const handleClick = () => {
    setIsActive(current => !current);
  };
  const closeSearch = () => {
    setIsActive(false);
  };
  const sidebarShow = () => {
    // isSidebarActive(current => !current);
    setShowSideBar(true);
  };
  return (
    <div className={`${showSideBar === true ? 'active-sidebar' : ''}`}>
      <header className="friday-navbar navbar  navbar-expand-sm navbar-light">
        <div className="container-fluid">
          <div className="friday-logo-holder">
            <button
              className="toggle-menu-mobile"
              onClick={() => setShowSideBar(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="wd-icon-justify wd-icon"
                focusable="false"
                role="presentation"
                viewBox="0 0 24 24"
              >
                <g fillRule="evenodd" className="wd-icon-container">
                  <path
                    d="M3 6.505C3 6.226 3.228 6 3.5 6h17c.276 0 .5.214.5.505v.99a.505.505 0 0 1-.5.505h-17a.495.495 0 0 1-.5-.505v-.99zm0 10c0-.279.228-.505.5-.505h17c.276 0 .5.214.5.505v.99a.505.505 0 0 1-.5.505h-17a.495.495 0 0 1-.5-.505v-.99zm0-5c0-.279.228-.505.5-.505h17c.276 0 .5.214.5.505v.99a.505.505 0 0 1-.5.505h-17a.495.495 0 0 1-.5-.505v-.99z"
                    className="wd-icon-fill"
                  ></path>
                </g>
              </svg>
            </button>
            <a className="friday-logo" href="/">
              <Image
                src={'/assets/images/logo.svg'}
                alt="Logo Image"
                height={80}
                width={80}
                priority
              />
            </a>
          </div>
          <div
            className={
              isActive
                ? 'main-search-container '
                : 'main-search-container desktop-view'
            }
          >
            <form className="d-flex">
              <input
                className="search-input-control no-border border-radius-4"
                type="search"
                placeholder="Search"
              />
              <span className="search-icon">
                <Icon variant="searchIcon" />
              </span>
            </form>
            <button className="mobile-search-cross" onClick={closeSearch}>
              <span className="material-icons-outlined">close</span>
              {/* <Icon  variant="cross"/> */}
            </button>
          </div>
          <div className="" id="">
            <ul className="navbar-nav mb-lg-0" ref={wrapperRef}>
              <li className="nav-item mobile-only">
                <button
                  className={isActive ? 'nav-link' : 'nav-link active'}
                  onClick={handleClick}
                >
                  <Icon variant="searchIcon" />
                </button>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link  dropdown-toggle no-toggle-arrow"
                  href="#/"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  onClick={() =>
                    setHide((prevState: any) => {
                      return {
                        ...prevState,
                        hideNotification: !prevState.hideNotification,
                        hideProfile: false,
                      };
                    })
                  }
                >
                  {/* <span className="material-icons">notifications</span> */}
                  <Image
                    src={'/assets/images/notification.svg'}
                    alt="Chat Icon"
                    height={15}
                    width={15}
                  />
                  <div className="number-wrapper">
                    <span className="number">8</span>
                  </div>
                </a>
                <ul
                  className={`dropdown-menu friday-dropdown-menu notification-dropdown border-radius-8 dropdown-shadow ${
                    hide.hideNotification ? 'show' : 'hide'
                  }`}
                >
                  <div className="friday-dropdown-body">
                    <ul className="notification-dropdown__group">
                      <li className="notification-dropdown__item">
                        <a href="" className="notification-dropdown__link">
                          <figure className="notification-dropdown__figure-holder">
                            {/* <Image src="https://via.placeholder.com/200" alt="" /> */}
                            <span className="status-online"></span>
                          </figure>
                          <figcaption className="notification-dropdown__caption">
                            <h2 className="notification-dropdown__title">
                              Asperiores harum excepturi dolor eveniet, vitae
                              officiis? Tenetur laborum animi modi aliquid non
                              excepturi
                            </h2>
                            <span className="notification-dropdown__date">
                              Monday
                            </span>
                          </figcaption>
                        </a>
                      </li>
                      <li className="notification-dropdown__item">
                        <a href="" className="notification-dropdown__link">
                          <figure className="notification-dropdown__figure-holder">
                            {/* <Image src="assets/images/user-avatar.jpg" alt="" /> */}
                          </figure>
                          <figcaption className="notification-dropdown__caption">
                            <h2 className="notification-dropdown__title">
                              Asperiores harum excepturi dolor eveniet, vitae
                              officiis? Tenetur laborum animi modi aliquid non
                              excepturi
                            </h2>
                            <span className="notification-dropdown__date">
                              Monday
                            </span>
                          </figcaption>
                        </a>
                      </li>
                      <li className="notification-dropdown__item">
                        <a href="" className="notification-dropdown__link">
                          <figure className="notification-dropdown__figure-holder">
                            {/* <Image src="assets/images/user-avatar.jpg" alt="" /> */}
                          </figure>
                          <figcaption className="notification-dropdown__caption">
                            <h2 className="notification-dropdown__title">
                              Asperiores harum excepturi dolor eveniet, vitae
                              officiis? Tenetur laborum animi modi aliquid non
                              excepturi
                            </h2>
                            <span className="notification-dropdown__date">
                              Monday
                            </span>
                          </figcaption>
                        </a>
                      </li>
                      <li className="notification-dropdown__item">
                        <a href="" className="notification-dropdown__link">
                          <figure className="notification-dropdown__figure-holder">
                            {/* <Image src="assets/images/user-avatar.jpg" alt="" /> */}
                          </figure>
                          <figcaption className="notification-dropdown__caption">
                            <h2 className="notification-dropdown__title">
                              Asperiores harum excepturi dolor eveniet, vitae
                              officiis? Tenetur laborum animi modi aliquid non
                              excepturi
                            </h2>
                            <span className="notification-dropdown__date">
                              Monday
                            </span>
                          </figcaption>
                        </a>
                      </li>
                      <li className="notification-dropdown__item">
                        <a href="" className="notification-dropdown__link">
                          <figure className="notification-dropdown__figure-holder">
                            {/* <Image src="assets/images/user-avatar.jpg" alt="" /> */}
                          </figure>
                          <figcaption className="notification-dropdown__caption">
                            <h2 className="notification-dropdown__title">
                              Asperiores harum excepturi dolor eveniet, vitae
                              officiis? Tenetur laborum animi modi aliquid non
                              excepturi
                            </h2>
                            <span className="notification-dropdown__date">
                              Monday
                            </span>
                          </figcaption>
                        </a>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-center">
                      <button className="friday-btn friday-btn-primary friday-btn-md">
                        See all recent activity
                      </button>
                    </div>
                  </div>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle no-toggle-arrow"
                  href="#"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                >
                  <Image
                    src={'/assets/images/info.svg'}
                    alt="Chat Icon"
                    height={15}
                    width={15}
                  />
                  {/* <div className="number-wrapper">
                    <span className="number">2</span>
                  </div> */}
                </a>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle no-toggle-arrow"
                  href="#/"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  onClick={() =>
                    setHide((prevState: any) => {
                      return {
                        ...prevState,
                        hideNotification: false,
                        hideProfile: !prevState.hideProfile,
                      };
                    })
                  }
                >
                  <span className="material-icons">account_circle</span>
                </a>
                <ul
                  className={`dropdown-menu friday-dropdown-menu user-dropdown-menu border-radius-8 dropdown-shadow ${
                    hide.hideProfile ? "show" : "hide"
                  }`}
                >
                  <a href="" className="user-info">
                    <figure className="user-info__figure-holder">
                      <Image src="assets/images/user-avatar.jpg" alt="" />
                    </figure>
                    <div className="">
                      <span className="user-info__name">Faisal Saeed</span>
                      <span className="user-info__link">View Profile</span>
                    </div>
                  </a>
                  <div className="user-dropdoown-body">
                    <li>
                      <a className="dropdown-item" href="#">
                        Home
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        My account
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        workbench
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        favorites
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        drive
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        my report
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        documentation
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        recovery assistant
                      </a>
                    </li>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="friday-btn friday-btn-primary friday-btn-md"
                      onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </ul>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.045"
                    height="15.835"
                    viewBox="0 0 15.045 15.835"
                  >
                    <path
                      id="Path_63874"
                      data-name="Path 63874"
                      d="M189.73,187.969l-.792.458h0a.791.791,0,0,0-.29,1.081l1.178,2.041h0a.792.792,0,0,0,1.082.29l.8-.461a1.573,1.573,0,0,1,1.572,0l.016.009a1.574,1.574,0,0,1,.792,1.365v.962a.792.792,0,0,0,.792.792h2.375a.792.792,0,0,0,.792-.792v-.964a1.572,1.572,0,0,1,.788-1.362l.017-.01a1.573,1.573,0,0,1,1.572,0l.8.461a.792.792,0,0,0,1.082-.29l1.178-2.041h0a.792.792,0,0,0-.293-1.081l-.792-.458h0a1.578,1.578,0,0,1-.792-1.372v-.017a1.577,1.577,0,0,1,.792-1.371l.792-.458h0a.792.792,0,0,0,.29-1.082l-1.18-2.041a.792.792,0,0,0-1.081-.29l-.8.461a1.573,1.573,0,0,1-1.572,0l-.011-.008a1.574,1.574,0,0,1-.792-1.365v-.963a.792.792,0,0,0-.792-.792h-2.375a.792.792,0,0,0-.792.792v1.024a1.47,1.47,0,0,1-.736,1.272l-.121.07a1.469,1.469,0,0,1-1.467,0l-.85-.491a.792.792,0,0,0-1.081.29l-1.178,2.041a.792.792,0,0,0,.288,1.082l.792.458h0a1.579,1.579,0,0,1,.792,1.372v.017a1.576,1.576,0,0,1-.792,1.371Zm6.334-3.755a2.375,2.375,0,1,1-1.68.7A2.375,2.375,0,0,1,196.063,184.213Z"
                      transform="translate(-188.542 -178.671)"
                      fill="#fff"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
