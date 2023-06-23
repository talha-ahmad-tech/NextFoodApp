import React from 'react';
import { AuthProvider } from 'oidc-react';
import { localstorageService } from '@fridayfood/shared/utils';
import { urlConverter } from '@/utils/helper';
import { useGetTenantInfoQuery } from 'services/modules/tenant.api';
import { Loader } from '@fridayfood/ui-toolkit';
const env = process.env.NODE_ENV;

const oidcConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSignIn: async (user: any) => {
    localstorageService.setToken(user?.access_token);
    window.location.href = '/reports/workspace';
  },
  ...urlConverter('sso'),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Auth = ({ children }: any) => {
  const GetTenantNameFromHost = () => {
    if (env === 'development') {
      console.log('Enviorment Development');
      return 'MyWays';
    } else if (env === 'production') {
      console.log('Enviorment Production');
      const splitedHost = window?.location?.host.split('.');
      return splitedHost.length > 0 ? splitedHost[0] : '';
    } else {
      return '';
    }
  };

  const GetRdirectURL = () => {
    if (env === 'development') {
      return process.env.NEXT_PUBLIC_SSO_REDIRECT_URL;
    } else if (env === 'production') {
      return window?.location?.origin;
    }
  };

  const TenantName = GetTenantNameFromHost();
  const {
    data: Tenant,
    isLoading,
    isSuccess,
  } = useGetTenantInfoQuery(TenantName, { skip: TenantName === '' });

  if (isLoading) {
    return <Loader />;
  }

  return Tenant?.isActive ? (
    <AuthProvider
      {...oidcConfig}
      redirectUri={GetRdirectURL()}
      extraQueryParams={{ __tenant: isSuccess ? Tenant?.name : '' }}
    >
      {children}
    </AuthProvider>
  ) : (
    <div className="d-flex p-2">
      <h1>{TenantName} NOT AN ACTIVE TENANT</h1>
    </div>
  );
};

export default Auth;
