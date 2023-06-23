import Cookies from 'js-cookie';

export const localstorageService = (() => {
  const _setToken = (value: string) => {
    Cookies.set('token', value);
  };

  const _getToken = () =>
    typeof window !== 'undefined' ? Cookies.get('token') : false;

  const _logout = (url?: string) => {
    Cookies.remove('token');
  };

  return {
    setToken: _setToken,
    getToken: _getToken,
    logout: _logout,
  };
})();
