import React, { FC } from 'react';
import useGetPermissions from '../customHook/useGetPermissions';
import { IsPermissionGranted } from '../utils/helper';

const withPermissions = (
  Wrapped: FC<any>,
  params: { permissionName: string },
) => {
  return (props: any) => {
    const { permissions } = useGetPermissions();
    const isAllowed = IsPermissionGranted(permissions, params?.permissionName);
    return (
      <>
        {isAllowed ? (
          <Wrapped {...props} />
        ) : (
          <div className="main-wrapper-full-access-restrcied">
            <i className="fa fa-lock" aria-hidden="true"></i>
            <h2>Access Restricted</h2>
            <p>
              You don't have permission to view this link,or the link may not be
              available. Please contact the admin and ask to assing you to this
              permission.
            </p>
          </div>
        )}
      </>
    );
  };
};

export default withPermissions;
