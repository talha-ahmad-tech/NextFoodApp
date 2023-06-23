import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import withRedux from '@fridayfood/shared/components/ReduxStoreHOC';
import { store } from '../lib/store';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/globals.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useRouter } from 'next/router';
import Layout from '@fridayfood/shared/components/Layout';
import { useEffect, useRef, useState } from 'react';
import { Toaster } from '@fridayfood/shared/components';
import dynamic from 'next/dynamic';
import { useLazyFetchUserPermissionsQuery } from 'services/modules/roles.api';
import { PERMISSIONS_PARAMS } from '@fridayfood/shared/genericTypes';
import {
  PermissionSetType,
  PermissionsContext,
} from '@fridayfood/shared/lib/context/PermissionsContext';
import { useEffectAfterSuccess } from '@fridayfood/shared';
import { PermissionsNotUsed, urlConverter } from '@/utils/helper';
import Head from 'next/head';
const AuthProvider = dynamic(() => import('lib/AuthProvider'), {
  ssr: false,
});

function App({ Component, pageProps }: AppProps) {
  const { events } = useRouter();
  const [permissions, setPermissions] = useState<PermissionSetType>({
    permissions: [],
  });
  const [fetchUserPermssion, { data, isLoading, isSuccess }] =
    useLazyFetchUserPermissionsQuery();

  useEffectAfterSuccess(() => {
    const filteredPermissions = data?.groups?.filter(
      (permission: { name: string }) =>
        !PermissionsNotUsed.includes(permission.name),
    );

    const filteredPermissionSet = new Array<{
      displayName: string;
      isGranted: boolean;
      name: string;
    }>();
    filteredPermissions.map(
      (role: {
        permissions: Array<{
          displayName: string;
          isGranted: boolean;
          name: string;
        }>;
      }) => {
        role.permissions?.map(per => {
          filteredPermissionSet.push(per);
        });
      },
    ),
      setPermissions({
        permissions: [...filteredPermissionSet],
      });
  }, isSuccess);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const overLayRef = useRef<any>(null);

  // Page route change handling
  useEffect(() => {
    const span = overLayRef.current;
    if (span !== null) {
      span.className = 'hide-loader';
    }
    const handleRouteChange = () => {
      const span = overLayRef.current;
      if (span && span !== null) {
        span.className = 'custom-uploader-wrapper show-loader';
      }
      return;
    };

    const handleRouteComplete = () => {
      const span = overLayRef.current;
      if (span !== null) {
        span.className = 'hide-loader';
      }
      return;
    };

    events.on('routeChangeStart', handleRouteChange);
    events.on('routeChangeComplete', handleRouteComplete); // If the component is unmounted, unsubscribe

    return () => {
      events.off('routeChangeStart', handleRouteChange);
    };
  }, [events]);

  const GetInitialData = (params: PERMISSIONS_PARAMS) => {
    fetchUserPermssion(params);
  };

  return (
    <>
      <Head>
        <title>{urlConverter('app') ?? `HQ - APP | FridayPOS`}</title>
      </Head>
      <PermissionsContext.Provider value={permissions}>
        <AuthProvider>
          <Layout callBackFunc={GetInitialData} loading={isLoading}>
            <Toaster />
            <Component {...pageProps} />
            <div
              className="custom-uploader-wrapper hide-loader"
              style={{ zIndex: 9999 }}
              ref={overLayRef}
            >
              <div className="multi-ripple">
                <div></div>
                <div></div>
              </div>
            </div>
          </Layout>
        </AuthProvider>
        <ToastContainer
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </PermissionsContext.Provider>
    </>
  );
}

export default withRedux(App, { store });
