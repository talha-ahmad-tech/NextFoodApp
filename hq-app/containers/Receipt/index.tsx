import {
  FormFooterActions,
  ListHeaderWrapper,
  SectionWrapper,
  alertService,
  // alertService,
} from '@fridayfood/shared/components';
import { Field } from '@fridayfood/ui-toolkit';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
import { CustomReceipt } from './receipt';
import { ADD_RECEIPT_TYPE } from './types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
import FileUploader from 'components/FileUploader';
import { useCreateUpdateRecieptMutation } from 'services/modules/reciept.api';
const Receipt = () => {
  const formProps = useForm<ADD_RECEIPT_TYPE>({
    mode: 'onTouched',
    defaultValues: formInitialValues,
    resolver: yupResolver(validationSchema),
  });
  const { register, watch, setValue, getValues } = formProps;
  const value = getValues();

  const [image, setImage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFile = (e: any) => {
    {
      setImage(URL.createObjectURL(e));
    }
  };
  const router = useRouter();
  const [createUpdateReciept] = useCreateUpdateRecieptMutation();
  const _handleSubmit = async (values?: ADD_RECEIPT_TYPE) => {
    const payload = {
      storeLogo: value?.showStoreLogo,
      storeImageUrl: value?.storeLogo,
      receipt: value?.showReceiptName,
      receiptName: value?.receiptName,
      store: value?.showStoreLogo,
      storeName: value?.storeName,
      cashier: value?.showCashier,
      duplicatePrint: value?.duplicatePrint,
      printOnParkes: value?.printOnParked,
      showDiscount: value?.showDiscount,
      showTaxCalculation: value?.showTaxCalculation,
      showVatNumber: value?.showVatNumber,
      showPaidBy: value?.showPaidBy,
      showStoreAddress: value?.showStoreAddress,
      showWebAddress: value?.showWebAddress,
      showWebUrl: value?.webAddress,
    };

    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: { [key: string]: string | number };
    } = await createUpdateReciept(payload);
    if (response.data) {
      // window.location.reload();
      alertService.success('Created', {
        keepAfterRouteChange: true,
        autoClose: true,
      });
    }
  };
  const [showStoreLogo, setShowStoreLogo] = useState(false);

  return (
    <>
      <div className="friday-vertical-tabs-container">
        <ListHeaderWrapper title={'Receipt'} showToggleButton={false} id={''} />
        <SectionWrapper>
          <div className="row">
            <div className="col-sm-12 col-md-6 border-right-1">
              <h2>General</h2>
              <div className="row justify-content-center border-b-1 py-3">
                {/* <SectionWrapper > */}

                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      // {...register('showStoreLogo')}
                      onChange={(e: { target: { checked: boolean } }) => {
                        setValue('showStoreLogo', e.target.checked);
                        setShowStoreLogo(e.target.checked);
                      }}
                      label={'Store Logo'}
                      value={showStoreLogo}
                      isHalfWidth={true}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className="input-file-wrapper mb-2">
                      {value.showStoreLogo && image.length > 0 && (
                        <div className="input-file-wrapper-inner-img">
                          <img
                            src={image}
                            alt="Thumb"
                            width={200}
                            height={50}
                          />
                        </div>
                      )}

                      {value.showStoreLogo && (
                        <>
                          <FileUploader
                            type="files"
                            {...register('storeLogo')}
                            appType="core"
                            endPoint="file-handler/upload-resource"
                            name={'storelogo'}
                            label={'Select File...'}
                            resourceType="1"
                            placeholder="Select File..."
                            changeUrl={async (value: string) => {
                              setValue('storeLogo', await value);

                              setImage(
                                `https://coreapp.preview.fridaypos.com${watch(
                                  'storeLogo',
                                )}`,
                              );
                            }}
                            noBorderFile
                            isFullwidth
                          />
                          {`${watch('storeLogo')}`}

                          <button
                            onClick={() => {
                              setValue('storeLogo', 'Select File...');
                              setImage('');
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="8.751"
                              height="13.234"
                              viewBox="0 0 8.751 13.234"
                              className="ms-2"
                            >
                              <g id="icon-delete" transform="translate(0)">
                                <path
                                  id="Path_65656"
                                  data-name="Path 65656"
                                  d="M-1612.445-720.124c0-1.471,0-2.942,0-4.413,0-.188.057-.234.233-.234q3.7.008,7.4,0c.179,0,.23.052.23.236q-.008,4.374,0,8.749a.858.858,0,0,1-.9.92h-6.059a.859.859,0,0,1-.9-.922Q-1612.446-717.956-1612.445-720.124Z"
                                  transform="translate(1612.894 728.098)"
                                  fill="#a0a4a7"
                                />
                                <path
                                  id="Path_65657"
                                  data-name="Path 65657"
                                  d="M-1620.07-787.29c-1.376,0-2.751,0-4.127,0-.181,0-.237-.054-.229-.238.013-.311,0-.624,0-.936a.527.527,0,0,1,.524-.589c.037,0,.074,0,.111,0,1.561-.005,3.123-.014,4.684-.015.936,0,1.871.009,2.806.016.421,0,.616.2.617.63,0,.306-.009.612,0,.917.007.169-.049.217-.211.216C-1617.281-787.292-1618.676-787.29-1620.07-787.29Z"
                                  transform="translate(1624.426 789.936)"
                                  fill="#a0a4a7"
                                />
                                <path
                                  id="Path_65658"
                                  data-name="Path 65658"
                                  d="M-1539.74-811.033c-.372,0-.744,0-1.115,0-.156,0-.2-.052-.147-.208a.83.83,0,0,1,.782-.618c.328,0,.657-.006.985,0a.847.847,0,0,1,.759.674c.026.142-.055.147-.149.147Z"
                                  transform="translate(1544.123 811.86)"
                                  fill="#a0a4a7"
                                />
                              </g>
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      {...register('showReceiptName')}
                      onChange={(e: { target: { checked: boolean } }) =>
                        setValue('showReceiptName', e.target.checked)
                      }
                      label={'Show Receipt Name'}
                      value={watch('showReceiptName')}
                      isHalfWidth={true}
                    />
                  </div>
                  <div className="col-sm-12 col-md-5">
                    {value.showReceiptName && (
                      <Field
                        {...register('receiptName')}
                        onChange={(e: { target: { value: string } }) =>
                          setValue('receiptName', e.target.value)
                        }
                        placeholder={'Enter'}
                        label={''}
                        value={watch('receiptName')}
                        isFullWidth={true}
                      />
                    )}
                  </div>
                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      {...register('showStoreName')}
                      onChange={(e: { target: { checked: boolean } }) =>
                        setValue('showStoreName', e.target.checked)
                      }
                      label={'Show Store Name'}
                      value={watch('showStoreName')}
                      isHalfWidth={true}
                    />
                  </div>

                  <div className="col-sm-12 col-md-5">
                    {value.showStoreName && (
                      <Field
                        {...register('storeName')}
                        onChange={(e: { target: { value: string } }) =>
                          setValue('storeName', e.target.value)
                        }
                        label={''}
                        value={watch('storeName')}
                        isFullWidth={true}
                      />
                    )}
                  </div>
                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      {...register('showCashier')}
                      onChange={(e: { target: { checked: boolean } }) =>
                        setValue('showCashier', e.target.checked)
                      }
                      label={'Cashier Name'}
                      value={watch('showCashier')}
                      isHalfWidth={true}
                    />
                  </div>
                  <div className="col-sm-12 col-md-5"></div>
                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      {...register('duplicatePrint')}
                      onChange={(e: { target: { checked: boolean } }) =>
                        setValue('duplicatePrint', e.target.checked)
                      }
                      label={'Duplicate Print'}
                      value={watch('duplicatePrint')}
                      isHalfWidth={true}
                    />
                  </div>
                  <div className="col-sm-12 col-md-5"></div>
                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      {...register('printOnParked')}
                      onChange={(e: { target: { checked: boolean } }) =>
                        setValue('printOnParked', e.target.checked)
                      }
                      label={'Print On Parked'}
                      value={watch('printOnParked')}
                      isHalfWidth={true}
                    />
                  </div>
                  <div className="col-sm-12 col-md-5"></div>
                </div>
                {/* </SectionWrapper> */}
              </div>
              <h2>Discount & Tax</h2>

              <div className="row justify-content-center border-b-1 py-3">
                {/* <SectionWrapper className="no-wrapper"> */}
                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      {...register('showDiscount')}
                      onChange={(e: { target: { checked: boolean } }) =>
                        setValue('showDiscount', e.target.checked)
                      }
                      label={'Show Discount'}
                      value={watch('showDiscount')}
                      isHalfWidth={true}
                    />
                  </div>
                  <div className="col-sm-12 col-md-5"></div>
                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      {...register('showTaxCalculation')}
                      onChange={(e: { target: { checked: boolean } }) =>
                        setValue('showTaxCalculation', e.target.checked)
                      }
                      label={'Show Tax Calculation'}
                      value={watch('showTaxCalculation')}
                      isHalfWidth={true}
                    />
                  </div>
                  <div className="col-sm-12 col-md-5"></div>

                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      {...register('showVatNumber')}
                      onChange={(e: { target: { checked: boolean } }) =>
                        setValue('showVatNumber', e.target.checked)
                      }
                      label={'Show VAT Number'}
                      value={watch('showVatNumber')}
                      isHalfWidth={true}
                    />
                  </div>
                  <div className="col-sm-12 col-md-5"></div>
                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      {...register('showPaidBy')}
                      onChange={(e: { target: { checked: boolean } }) =>
                        setValue('showPaidBy', e.target.checked)
                      }
                      label={'Show Paid By'}
                      value={watch('showPaidBy')}
                      isHalfWidth={true}
                    />
                  </div>
                  <div className="col-sm-12 col-md-5"></div>
                </div>

                {/* </SectionWrapper> */}
              </div>
              <h2>Address</h2>

              <div className="row justify-content-center pt-3">
                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      {...register('showStoreAddress')}
                      onChange={(e: { target: { checked: boolean } }) =>
                        setValue('showStoreAddress', e.target.checked)
                      }
                      label={'Show Store Address'}
                      value={watch('showStoreAddress')}
                      isHalfWidth={true}
                    />
                  </div>
                  <div className="col-sm-12 col-md-5"></div>
                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      {...register('showCity')}
                      onChange={(e: { target: { checked: boolean } }) =>
                        setValue('showCity', e.target.checked)
                      }
                      label={'Show Postal Code/City'}
                      value={watch('showCity')}
                      isHalfWidth={true}
                    />
                  </div>
                  <div className="col-sm-12 col-md-5"></div>
                </div>
                {/* <SectionWrapper className="no-wrapper"> */}

                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    <Field
                      type="switch"
                      {...register('showWebAddress')}
                      onChange={(e: { target: { checked: boolean } }) =>
                        setValue('showWebAddress', e.target.checked)
                      }
                      label={'Show Web Address'}
                      value={watch('showWebAddress')}
                      isHalfWidth={true}
                    />
                  </div>
                  <div className="col-sm-12 col-md-5">
                    {value.showWebAddress && (
                      <Field
                        type="text"
                        {...register('webAddress')}
                        onChange={(e: { target: { value: string } }) =>
                          setValue('webAddress', e.target.value)
                        }
                        label={''}
                        value={watch('webAddress')}
                        isFullWidth={true}
                      />
                    )}
                  </div>
                </div>
                {/* </SectionWrapper> */}
              </div>
            </div>
            <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center">
              <SectionWrapper className="no-wrapper no-border d-flex justify-content-center">
                <CustomReceipt formData={formProps} image={image} />
              </SectionWrapper>
            </div>
          </div>
        </SectionWrapper>
        <FormFooterActions
          activeStep={0}
          isLastStep={true}
          handleSave={_handleSubmit}
        />
      </div>
    </>
  );
};

export default withPermissions(Receipt, {
  permissionName: PERMISSIONS.VIEW_RECIEPT,
});
