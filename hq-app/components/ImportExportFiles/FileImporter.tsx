/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from '@fridayfood/ui-toolkit';
import { useContext } from 'react';
import FilePicker from '@fridayfood/shared/components/FilePicker';
import {
  ImportExportContext,
  SetImportExportContext,
} from '@fridayfood/shared/components/Context/ImportExportContext';
import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { LOADER_TYPE } from '@/utils/constants';
import {
  useUploadIngredientsMutation,
  useBulkUploadIngredientsMutation,
} from 'services/modules/ingredients.api';
import {
  useUploadFinishProductMutation,
  useBulkUploadMutation,
} from 'services/modules/products.api';
import {
  useUploadInventoryMutation,
  useBulkInventoryUploadMutation,
} from 'services/modules/inventoryAdjustment.api';
import {
  useBulkCategoriesUploadMutation,
  useUploadCategoriesMutation,
} from 'services/modules/categories.api';

type CustomPropTypes = {
  type: keyof typeof LOADER_TYPE;
};

const FileImporter = ({ type }: CustomPropTypes) => {
  //Loader Finished Product
  const [uploadFinishProductFile] = useUploadFinishProductMutation();
  const [bulkUpload] = useBulkUploadMutation();

  //Loader Ingredient
  const [uploadIngerdient] = useUploadIngredientsMutation();
  const [bulkIngredient] = useBulkUploadIngredientsMutation();

  //Loader INVENTORY ADJUSTMENT
  const [uploadInventory] = useUploadInventoryMutation();
  const [bulkInventory] = useBulkInventoryUploadMutation();

  //Categories Loader
  const [uploadCategories] = useUploadCategoriesMutation();
  const [uploadBulkCategories] = useBulkCategoriesUploadMutation();

  const setContext = useContext(SetImportExportContext);
  const router = useRouter();
  const context = useContext(ImportExportContext);
  const { isModalOpen, isModalLoading } = context;

  const onFilePick = async (file: File) => {
    setContext({
      ...context,
      isModalLoading: true,
    });

    const body = new FormData();
    body.append('File', file);

    const fileUploader: any = GetUploadFunction();
    const res: any = await fileUploader(body);
    if (res?.data) {
      const { data } = res?.data;
      const contentUploader: any = GetBulkUploadFunc();
      const uploadRes = await contentUploader(data);
      PromiseHandler(uploadRes);
    } else {
      setContext({
        ...context,
        isModalLoading: false,
      });
    }
  };

  const GetUploadFunction = () => {
    if (type === LOADER_TYPE.FINISHED_PRODUCT) {
      return uploadFinishProductFile;
    } else if (type === LOADER_TYPE.INGREDIENTS) {
      return uploadIngerdient;
    } else if (type === LOADER_TYPE.INVENTORY_ADJSUTMETN) {
      return uploadInventory;
    } else if (type === LOADER_TYPE.CATEGORY) {
      return uploadCategories;
    }
  };

  const GetBulkUploadFunc = () => {
    if (type === LOADER_TYPE.FINISHED_PRODUCT) {
      return bulkUpload;
    } else if (type === LOADER_TYPE.INGREDIENTS) {
      return bulkIngredient;
    } else if (type === LOADER_TYPE.INVENTORY_ADJSUTMETN) {
      return bulkInventory;
    } else if (type === LOADER_TYPE.CATEGORY) {
      return uploadBulkCategories;
    }
  };

  const PromiseHandler = (res: { data: Array<object> }) => {
    if (res?.data) {
      setContext({
        ...context,
        isModalOpen: false,
        isModalLoading: false,
      });
      router.push(router.asPath);
      toast.success(`${res?.data.length} rows added succeffully!`);
    } else {
      setContext({
        ...context,
        isModalLoading: false,
      });
    }
  };

  return (
    <Modal
      show={isModalOpen}
      customOkHeading="Upload"
      close={() => {
        setContext({
          ...context,
          isModalOpen: false,
        });
      }}
      title={'Import from Excel'}
      customClass={true}
      modalWidth="custom-small-modal"
      isLoading={isModalLoading}
    >
      <div className="d-flex justify-content-center h-50">
        <FilePicker onFilePick={onFilePick} />
      </div>
    </Modal>
  );
};

export default FileImporter;
