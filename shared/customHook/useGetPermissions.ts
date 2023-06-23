import { useContext } from 'react';
import { PermissionsContext } from '../lib/context/PermissionsContext';
const useGetPermissions = () => {
  const permissions = useContext(PermissionsContext);

  return permissions;
};

export default useGetPermissions;
