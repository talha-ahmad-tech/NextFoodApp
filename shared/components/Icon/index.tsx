import React from 'react';
import Image from 'next/image';
interface IProps {
  variant: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export interface IconVariant extends Record<string, any> {
  accountsPayable?: string;
  taxmanagement?: string;
  retailmanagemenet?: string;
  warehousemanagement?: string;
  productinventory?: string;
  accountsReceivable?: string;
  productInventory?: string;
  salesManagement?: string;
  procurementManagement?: string;
  finance?: string;
  allVendors?: string;
  vendorGroups?: string;
  vendorOnHold?: string;
  vendorTransactions?: string;
  allPO?: string;
  allReturnOrder?: string;
  debitNotes?: string;
  chart?: string;
  allVendorInvoices?: string;
  allVendorPayments?: string;
  invoicesDueToPay?: string;
  paymentSettlement?: string;
  allConfigurations?: string;
  acctPayableParameter?: string;
  vendorPostingSetup?: string;
  termsOfDelivery?: string;
  methodsOfPayment?: string;
  agingPeriodDefination?: string;
  paymentTerms?: string;
  vendorCashDiscounts?: string;
  invoiceMatchingPolicy?: string;
  lineOfBusiness?: string;
  modeOfDelivery?: string;
  businessSegments?: string;
  vendorAutoCharges?: string;
  careerCompany?: string;
  allReports?: string;
  goodsReceiptNote?: string;
  vendorStatement?: string;
  vendorAging?: string;
  add?: string;
  tick?: string;
  cross?: string;
  secondImg?: string;
  singleImg?: string;
  filter?: string;
  setting?: string;
  plus?: string;
  searchFilter?: string;
  searchIcon?: string;
  arrowdown?: string;
  noProduct?: string;
  arrowup?: string;
  systemAdministration?: string;
  attachements?: string;
  file?: string;
  fridayBlackLogo?: string;
  inputFile?: string;
  arrowLeft?: string;
  arrowRight?: string;
  reset?: string;
}
const IconPath: IconVariant = {
  //Common
  tick: '/assets/images/svgs/Tick.svg',
  plus: '/assets/images/svgs/Plus.svg',
  cross: '/assets/images/svgs/Cross.svg',
  secondImg: '/assets/images/svgs/SecondImg.svg',
  singleImg: '/assets/images/svgs/SingleImg.svg',
  filter: '/assets/images/svgs/Filter.svg',
  setting: '/assets/images/svgs/Settings.svg',
  searchFilter: '/assets/images/svgs/searchfilter.svg',
  noProduct: '/assets/images/svgs/noProduct.svg',
  chart: '/assets/images/svgs/Chart.svg',
  searchIcon: '/assets/images/svgs/SearchIcon.svg',
  fridayBlackLogo: '/assets/images/svgs/fridayBlackLogo.svg',
  inputFile: '/assets/images/svgs/inputFile.svg',
  //General Menu
  add: '/assets/images/svgs/Add.svg',

  //Side Menu8
  accountsPayable: '/assets/images/svgs/AccountsPayable.svg',
  accountsReceivable: '/assets/images/svgs/AccountsReceivable.svg',
  productinventory: '/assets/images/svgs/product&inventory.svg',
  finance: '/assets/images/svgs/Finance.svg',
  procurementManagement: '/assets/images/svgs/ProcurementManagement.svg',
  salesManagement: '/assets/images/svgs/SalesManagement.svg',
  taxmanagement: '/assets/images/svgs/TaxManagement.svg',
  retailmanagemenet: '/assets/images/svgs/RetailManagement.svg',
  productInventory: '/assets/images/svgs/ProductInventory.svg',
  warehousemanagement: '/assets/images/svgs/WarehouseManagement.svg',
  arrowdown: '/assets/images/svgs/ArrowDown.svg',
  arrowup: '/assets/images/svgs/ArrowUp.svg',
  systemAdministration: '/assets/images/svgs/SystemAdministration.svg',
  file: '/assets/images/svgs/File.svg',
  attachements: '/assets/images/svgs/Attachments.svg',

  // Vendor Tab
  allVendors: '/assets/images/svgs/AllVendors.svg',
  vendorGroups: '/assets/images/svgs/VendorGroups.svg',
  vendorOnHold: '/assets/images/svgs/VendoronHold.svg',
  vendorTransactions: '/assets/images/svgs/VendorTransactions.svg',

  // Purchase Order
  allPO: '/assets/images/svgs/AllPurchaseOrder.svg',
  allReturnOrder: '/assets/images/svgs/AllReturned.svg',
  debitNotes: '/assets/images/svgs/DebitNotes.svg',

  // Purchase Invoices
  allVendorInvoices: '/assets/images/svgs/AllVendorInvoices.svg',

  // Purchase Payments
  allVendorPayments: '/assets/images/svgs/AllVendorPayments.svg',
  invoicesDueToPay: '/assets/images/svgs/InvoicesDuetoPay.svg',
  paymentSettlement: '/assets/images/svgs/MethodsofPayment.svg',

  //Setup / Configurations
  allConfigurations: '/assets/images/svgs/AllConfigurations.svg',
  acctPayableParameter: '/assets/images/svgs/AcctPayableParameter.svg',
  vendorPostingSetup: '/assets/images/svgs/VendorPostingSetup.svg',
  termsOfDelivery: '/assets/images/svgs/TermsofDelivery.svg',
  methodsOfPayment: '/assets/images/svgs/MethodsofPayment.svg',
  agingPeriodDefination: '/assets/images/svgs/AgingPeriodDefinition.svg',
  paymentTerms: '/assets/images/svgs/PaymentTerms.svg',
  vendorCashDiscounts: '/assets/images/svgs/VendorCashDiscount.svg',
  invoiceMatchingPolicy: '/assets/images/svgs/InvoiceMatchingPolicy.svg',
  lineOfBusiness: '/assets/images/svgs/LineofBusiness.svg',
  modeOfDelivery: '/assets/images/svgs/ModeofDelivery.svg',
  businessSegments: '/assets/images/svgs/BusinessSegments.svg',
  vendorAutoCharges: '/assets/images/svgs/VendorAutoCharges.svg',
  careerCompany: '/assets/images/svgs/CareerCompany.svg',

  // Reports
  allReports: '/assets/images/svgs/InvoiceMatchingPolicy.svg',
  goodsReceiptNote: '/assets/images/svgs/GoodsReceiptNote.svg',
  vendorStatement: '/assets/images/svgs/VendorStatement.svg',
  vendorAging: '/assets/images/svgs/AgingPeriodDefinition.svg',
  arrowLeft: '/assets/images/svgs/ArrowLeft.svg',
  arrowRight: '/assets/images/svgs/ArrowRight.svg',
  reset: '/assets/images/svgs/Reset.svg',
};

export const Icon = (props: IProps) => {
  const { variant, style, onClick = () => {} }: IProps = props || {};
  // const Component = variantComponents[props.variant];
  return (
    <Image
      style={style}
      src={IconPath[variant]}
      width={20}
      height={20}
      alt={''}
      onClick={onClick}
    />
  );
};
