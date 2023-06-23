'use static';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Head from 'next/head';
import Loader from '@fridayfood/ui-toolkit/src/Loader';
import TabsHorizontal from '../TabsHorizontal';
import { useRouter } from 'next/router';
import { mainHeaderItemsHQ, mainHeaderItemsWLA } from './config';
import { useAuth } from 'oidc-react';
import { PERMISSIONS_PARAMS } from '../../genericTypes';
import useEffectAfterMount from '../hooks/useEffectAfterMount';
import jwtDecode from 'jwt-decode';

interface ILayout {
  loading?: boolean;
  children: any;
  app?: 'hq' | 'wla' | 'superadmin';
  callBackFunc?: (params: PERMISSIONS_PARAMS) => void;
}

const Layout = ({
  loading,
  children,
  app = 'hq',
  callBackFunc = (params: PERMISSIONS_PARAMS) => params,
}: ILayout) => {
  const router = useRouter();
  const auth = useAuth();
  const selectedtTab = router.asPath?.split('/')[1];
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const toggleSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  useEffectAfterMount(() => {
    if (auth.userData) {
      const DecodeData: { role: string } = jwtDecode(
        auth?.userData?.access_token,
      );
      callBackFunc({ providerKey: DecodeData?.role ?? '', providerName: 'R' });
    }
  }, [auth.userData]);

  return (
    <>
      {auth.userData ? (
        <>
          <div className="main-wrapper">
            <Aside
              showSideBar={showSideBar}
              toggleSidebar={toggleSidebar}
              app={app}
            />

            <div
              className={`${
                showSideBar === true
                  ? 'active-sidebar main-body-container'
                  : 'main-body-container closed-sidebar'
              }`}
            >
              <Header
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
              />
              <TabsHorizontal
                tabs={
                  app === 'hq'
                    ? mainHeaderItemsHQ[`${selectedtTab}`]
                    : mainHeaderItemsWLA[`${selectedtTab}`]
                }
              />
              <div className="section-wrapper">
                {loading ? (
                  <Loader />
                ) : (
                  <div className="container-fluid">{children}</div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default React.memo(Layout);
