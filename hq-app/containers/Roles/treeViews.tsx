/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormFooterActions, alertService } from '@fridayfood/shared/components';
import Tree from '@fridayfood/shared/components/Tree';
import { useState, useEffect } from 'react';
import {
  useCreatePermissionsMutation,
  useFetchPermissionQuery,
} from 'services/modules/roles.api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import Card from '@fridayfood/shared/components/Card';
const TreeViews = ({ itemClicked }: { itemClicked: string }) => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const { data: permissionData } = useFetchPermissionQuery({
    providerName: 'R',
    providerKey: itemClicked ?? '',
  });
  const permissionsData = permissionData?.groups;
  const [grantPermissions] = useCreatePermissionsMutation();
  const [dv, setDv] = useState([]);

  useEffect(() => {
    if (permissionsData?.length) {
      const values = permissionsData?.map((item: any) => {
        const resp = {
          ...item,
          checked: true,
          expanded: true,
          parent: true,
          permissions: item.permissions?.map((child: any) => ({
            ...child,
            checked: child?.isGranted ? true : false,
            expanded: child?.isGranted ? true : false,
            isGranted: child?.isGranted ? true : false,
          })),
        };
        return resp;
      });
      setDv(values);
    }
  }, [permissionsData]);

  return (
    <>
      <Card Headertitle="Permissions" maxHeight>
        <Tree
          tree={dv ?? []}
          simpleTree={true}
          childrenKey="permissions"
          onSave={(e: any) => {
            const selectedPermission = e.permissions;
            setSelectedPermissions(selectedPermission);
          }}
        />
      </Card>
      <FormFooterActions
        customTitle="Save"
        activeStep={0}
        noPadding="no-padding"
        handleSave={async () => {
          let obj = [] as any;
          selectedPermissions?.map((outer: any) => {
            outer.items?.map((inner: any) => {
              obj = [
                ...obj,
                { name: inner?.name, isGranted: inner?.isGranted },
              ];
            });
          });
          const ModifiedValue = { permissions: obj };
          const ParamData = {
            providerName: 'R',
            providerKey: itemClicked ?? '',
          };
          const ModifiedPayload = { permissions: ModifiedValue, ParamData };
          const response: {
            error?: FetchBaseQueryError | SerializedError;
            data?: string | number;
          } = await grantPermissions(ModifiedPayload);
          if (!response.error) {
            alertService.success('Permissions Updated');
          }
        }}
      />
    </>
  );
};

export default TreeViews;
