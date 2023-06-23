import { urlConverter } from '@/utils/helper';
import { Field } from '@fridayfood/ui-toolkit';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useAuth } from 'oidc-react';
import axios from 'axios';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

const FileUploader = (props: {
  accept?: string;
  appType?: '' | 'setup' | 'products' | 'filters' | 'core' | 'order' | 'sso';
  endPoint?: string;
  resourceType: string | Blob;
  changeUrl: (props: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setLoading?: SetStateAction<boolean> | any;
  name: string;
  label: string;
  errorMessage?:
    | string
    | FieldError
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  type: 'file';
}) => {
  const auth = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [file, setFile] = useState<any>({});
  const appUrl = urlConverter(props?.appType ? props?.appType : 'products');

  const preFix = '/api/app/';

  const endPoint = props?.endPoint
    ? props?.endPoint
    : 'file-handler/upload-resource';
  const url = appUrl + preFix + endPoint;

  const fileUploader = async () => {
    props?.setLoading(true);
    const input = new FormData();
    input.append('File', file);
    input.append('ResourceType', props?.resourceType);
    try {
      const { data, status } = await axios({
        method: 'POST',
        url,
        data: input,

        headers: {
          accept: 'text/plain',
          Authorization: 'Bearer ' + auth.userData?.access_token,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (status === 200) {
        props?.setLoading(false);
      }
      return status === 200 ? data?.absolutePath : status;
    } catch (error) {
      props?.setLoading(false);
      return error;
    }
  };

  useEffect(() => {
    if (file?.name) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = fileUploader();

      props?.changeUrl(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <div>
      <Field
        {...props}
        accept={props?.accept}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e: any) => {
          const file = e.target.files[0];
          setFile(file);
        }}
      />
    </div>
  );
};

export default FileUploader;
