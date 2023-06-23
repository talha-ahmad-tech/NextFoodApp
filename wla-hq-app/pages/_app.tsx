import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import withRedux from '@fridayfood/shared/components/ReduxStoreHOC';
import { store } from '../lib/store';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ToastContainer } from 'react-toastify';

import { useRouter } from 'next/router';
import Layout from '@fridayfood/shared/components/Layout';
import { useEffect, useRef } from 'react';
import { Toaster } from '@fridayfood/shared/components';
import dynamic from 'next/dynamic';

const AuthProvider = dynamic(() => import('lib/AuthProvider'), {
  ssr: false,
});

function App({ Component, pageProps }: AppProps) {
  const { events } = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const overLayRef = useRef<any>(null);
  useEffect(() => {
    const span = overLayRef.current; // corresponding DOM node
    if (span !== null) {
      span.className = 'hide-loader';
    }
    const handleRouteChange = (url: string) => {
      const span = overLayRef.current; // corresponding DOM node
      if (span && span !== null) {
        span.className = 'custom-uploader-wrapper show-loader';
      }
      console.log(`App is changing to ${url} with shallow routing`);
      // document.getElementById("spinner").style.display = "block";
      return;
    };

    const handleRouteComplete = (_url: string) => {
      console.log('you have finished going to the new page', _url);
      const span = overLayRef.current; // corresponding DOM node
      if (span !== null) {
        span.className = 'hide-loader';
      }
      // document.getElementById("spinner").style.display = "none";
      return;
    };

    events.on('routeChangeStart', handleRouteChange);
    events.on('routeChangeComplete', handleRouteComplete); // If the component is unmounted, unsubscribe

    // from the event with the `off` method:
    return () => {
      events.off('routeChangeStart', handleRouteChange);
    };
  }, [events]);

  // const { hasError = false, statusCode = 0, message = '' } = { ...pageProps };
  // if (hasError) {
  //   return <Error statusCode={statusCode} message={message} />;
  // }
  return (
    <>
      <AuthProvider>
        <Layout app="wla">
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
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

// App.ErrorComponent = Error;

export default withRedux(App, { store });
