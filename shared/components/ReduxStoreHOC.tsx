import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
type IStore = ToolkitStore<any>;

const withRedux = <P extends AppProps>(
  Wrapped: React.ComponentType<P>,
  params: { store: IStore },
) => {
  return (props: P) => {
    return (
      <Provider store={params.store}>
        <Wrapped {...props} />
      </Provider>
    );
  };
};

export default withRedux;
