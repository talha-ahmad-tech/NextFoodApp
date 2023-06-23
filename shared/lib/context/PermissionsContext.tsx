import { Dispatch, SetStateAction, createContext } from 'react';

type Permission = {
  name: string;
  isGranted: boolean;
  displayName: string;
};

export type PermissionSetType = {
  permissions: Array<Permission>;
};

const EmptyPermission = [{ name: '', isGranted: false, displayName: '' }];
export const PermissionsContext = createContext<PermissionSetType>({
  permissions: EmptyPermission,
});
