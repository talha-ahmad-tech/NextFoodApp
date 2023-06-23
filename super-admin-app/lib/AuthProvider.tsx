import React from 'react';
import { AuthProvider } from 'oidc-react';
import { localstorageService } from '@fridayfood/shared/utils';
import { urlConverter } from '@/utils/helper';

const oidcConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSignIn: async (user: any) => {
    localstorageService.setToken(user?.access_token);
    window.location.href = '/companymanagement/company';
  },
  ...urlConverter('sso'),
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Auth = ({ children }: any) => {
  console.log(oidcConfig);
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
};

export default Auth;
