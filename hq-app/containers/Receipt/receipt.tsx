import { UseFormReturn } from 'react-hook-form';
// import { ADD_RECEIPT_TYPE } from './types';

export const CustomReceipt = ({
  formData,
  image,
}: {
  image: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}) => {
  const { getValues } = formData;
  const values = getValues();

  return (
    <div className="receipt-wrapper-main">
      <div className="receipt-wrapper-main-inner">
        <div className="receipt-wrapper-main-wrapper-outer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="281"
            height="20"
            viewBox="0 0 281 20"
          >
            <defs>
              <clipPath id="clip-path">
                <rect
                  id="Rectangle_8421"
                  data-name="Rectangle 8421"
                  width="281"
                  height="20"
                  transform="translate(-20248 9402)"
                  fill="#862828"
                />
              </clipPath>
            </defs>
            <g
              id="Mask_Group_12"
              data-name="Mask Group 12"
              transform="translate(20248 -9402)"
              clip-path="url(#clip-path)"
            >
              <path
                id="Path_65783"
                data-name="Path 65783"
                d="M1314.1-598.18a8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779H1266.7a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779H1042a8.778,8.778,0,0,1-8.778,8.779v452.958a8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778H1136.8a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778V-598.18Z"
                transform="translate(-21281.227 10008.959)"
                fill="#fff"
              />
            </g>
          </svg>
        </div>
        {/* <img s></> */}
        <div className="logo-wrapper-subway">
          {values.showStoreLogo && image.length > 0 && (
            <img src={image} alt="Review image" />
          )}
        </div>
        <p className="text-center custom-p-12">Order #</p>
        <h6 className="font-bold text-center custom-p-12">1015</h6>
        {values.showReceiptName && (
          <p className="font-bold text-center custom-p-12 py-2">
            {values.receiptName}
          </p>
        )}
        {values.showStoreName && (
          <p className="text-center custom-p-12">{values.storeName}</p>
        )}
        {values.showStoreAddress && (
          <p className="text-center custom-p-12">Gulberg III</p>
        )}
        {values.showCity && (
          <p className="text-center custom-p-12">Lahore, 54000</p>
        )}
        <div className="d-flex justify-content-between">
          <p className="custom-p-12">07/03/2023</p>
          <p className="text-end custom-p-12">17:34</p>
        </div>
        <div className="d-flex justify-content-between">
          {values.showVatNumber && (
            <p className="custom-p-12">VAT# ID-554324</p>
          )}
          <p className="font-bold text-end custom-p-12">TAKE AWAY</p>
        </div>
        {values.showCashier && (
          <div className="d-flex justify-content-between">
            <p className="custom-p-12">Cashier: James White</p>
          </div>
        )}
        <div className="d-flex justify-content-between border-b-dashed py-2">
          <p className="font-bold custom-p-12">ITEM</p>
          <p className="font-bold text-end custom-p-12">PRICE</p>
        </div>
        <div className="d-flex justify-content-between border-b-dashed py-2">
          <div className="d-flex flex-column ">
            <p className="font-bold custom-p-12">6 Spicy italian</p>
            <span className="custom-p-12">Bread- Italian</span>
            <span className="custom-p-12">Saucess- Honey Mustard</span>
            <span className="custom-p-12">Veggles-Onion</span>
          </div>

          <p className="font-bold text-end custom-p-12">$15.00</p>
        </div>
        <div className="d-flex justify-content-between  py-2">
          <div>
            <p className="font-bold custom-p-12">SUBTOTAL</p>
            {values.showDiscount && (
              <p className="font-bold custom-p-12">DISCOUNT</p>
            )}
            {values.showTaxCalculation && (
              <p className="font-bold custom-p-12">TAX</p>
            )}
          </div>
          <div>
            <p className="font-bold text-end custom-p-12">$15.00</p>
            {values.showDiscount && (
              <p className="font-bold text-end custom-p-12">
                <span className="font-normal pe-2">10%</span>$1.50
              </p>
            )}
            {values.showTaxCalculation && (
              <p className="font-bold text-end custom-p-12">$1.50</p>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between border-t-black py-2">
          <div>
            <p className="font-bold custom-p-12">TOTAL</p>
            {values.showPaidBy && <p className="custom-p-12">PAID BY CASH</p>}
          </div>
          <div>
            <p className="font-bold text-end custom-p-12">$15.00</p>
            {values.showPaidBy && (
              <p className="text-end custom-p-12">$15.00</p>
            )}
          </div>
        </div>
        {values.showWebAddress && (
          <p className="text-center custom-p-12">{values.webAddress}</p>
        )}
        <div className="receipt-wrapper-main-wrapper-bottom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="281"
            height="20"
            viewBox="0 0 281 20"
          >
            <defs>
              <clipPath id="clip-path">
                <rect
                  id="Rectangle_8422"
                  data-name="Rectangle 8422"
                  width="281"
                  height="20"
                  transform="translate(-20248 9402)"
                  fill="#862828"
                />
              </clipPath>
            </defs>
            <g
              id="Mask_Group_13"
              data-name="Mask Group 13"
              transform="translate(-19967 9422) rotate(180)"
              clip-path="url(#clip-path)"
            >
              <path
                id="Path_65786"
                data-name="Path 65786"
                d="M1314.1-598.18a8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779H1266.7a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779h-10.531a8.778,8.778,0,0,1-8.778,8.779,8.778,8.778,0,0,1-8.778-8.779H1042a8.778,8.778,0,0,1-8.778,8.779v452.958a8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778H1136.8a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778,8.778,8.778,0,0,1,8.778,8.778h10.531a8.778,8.778,0,0,1,8.778-8.778V-598.18Z"
                transform="translate(-21281.227 10008.959)"
                fill="#fff"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
