/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOGGLE_OPTIONS, ToggleContext } from '@fridayfood/shared/components';
import Card from '@fridayfood/shared/components/Card';
import ToggleButton from '@fridayfood/shared/components/ToggleButton';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import Loyalty from './Components/loyatyComponent';
import Coupon from './Components/couponComponent';
import Logs from './Components/logComponent';
import { GetLocalDate, GetLocalTime } from '@/utils/helper';

const StatsTable = (props?: any) => {
  const discountTable: object[] = [
    {
      name: 'Sub Total',
      value: props?.grossAmount ? props?.grossAmount.toFixed(2) : '0.00',
    },
    {
      name: 'Tax',
      value: props?.orderPayments[0].tax
        ? props?.orderPayments[0].tax.toFixed(2)
        : '0.00',
    },
    {
      name: 'Discount',
      value: props?.orderPayments[0].discount
        ? props?.orderPayments[0].discount.toFixed(2)
        : '0.00',
    },
    {
      name: 'Delivery Charges',
      value: props?.orderPayments[0].deliveryCharges
        ? props?.orderPayments[0].deliveryCharges.toFixed(2)
        : '0.00',
    },
    {
      name: 'Total',
      value: props?.orderPayments[0].totalAmount
        ? props?.orderPayments[0].totalAmount.toFixed(2)
        : '0.00',
    },
  ];

  const router = useRouter();

  const Content = ({ label, value }: { label: string; value: string }) => {
    return (
      <div className="d-flex mt-2">
        <p
          className="card-text mi text-muted custom-card-text-size"
          style={{ minWidth: '100px' }}
        >
          <small className="text-muted">{label}</small>
        </p>
        <p className="card-text custom-card-text-size">
          <small className="text-muted">{value}</small>
        </p>
      </div>
    );
  };

  const ProductCard = ({ prod }: any) => {
    return (
      <div
        className="card mb-3 col-sm"
        style={{ minWidth: 350, maxWidth: 350, marginLeft: 20 }}
      >
        <div className="row no-gutters">
          <div className="col-md-12">
            <div className="card-body">
              <h5 className="card-title custom-card-title">
                {prod?.productName}
              </h5>
              <div
                className="row pt-2"
                style={{ borderTop: '2px solid rgba(36, 40, 44, 0.1)' }}
              />

              <div className="d-flex ">
                <p
                  style={{ minWidth: '100px' }}
                  className="card-text text-muted custom-card-text-size"
                >
                  Category:
                </p>
                <p className="card-text custom-card-text-size">
                  {prod?.categoryName}
                </p>
              </div>
              <div
                className="row pt-2 mt-2"
                style={{ borderTop: '2px solid rgba(36, 40, 44, 0.1)' }}
              />
              <div className="d-flex">
                <p
                  style={{ minWidth: '100px' }}
                  className="card-text text-muted custom-card-text-size"
                >
                  Selection:
                </p>
                <p className="mb-2 custom-card-text" style={{ height: 45 }}>
                  {prod?.orderProductModifiers.length > 0
                    ? prod?.orderProductModifiers.map(
                        ({ modifierName }: { modifierName: string }) =>
                          modifierName,
                      )
                    : 'No Selection'}
                </p>
              </div>
            </div>
            <div
              className="row pt-2"
              style={{ borderTop: '2px solid rgba(36, 40, 44, 0.1)' }}
            />
            <div className="card-body pt-0">
              <Content label="Price" value={prod?.price.toFixed(2) ?? '-'} />
              <Content label="Quantity" value={prod?.quantity ?? '-'} />
              <Content
                label="Gross Amount"
                value={prod?.grossAmount.toFixed(2) ?? '-'}
              />
              <Content
                label="Tax"
                value={`${prod?.tax} ${
                  prod?.tax > 0 ? `(${prod?.taxName} - ${prod?.taxRate})` : ''
                }`}
              />
              <Content
                label="Net Amount"
                value={prod?.netAmount.toFixed(2) ?? '-'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const activeTab = useContext(ToggleContext);
  console.log(props);
  return (
    <div>
      <div className="row pb-4">
        <div className="col-sm-12 col-md-6 cursor-pointer">
          <Image
            src={'/assets/images/svgs/ArrowUp.svg'}
            alt={''}
            height={15}
            width={25}
            style={{
              transform: 'rotate(90deg)',
              cursor: 'pointer',
              paddingRight: 10,
            }}
            onClick={() => router.back()}
          />
          <b style={{ fontSize: 22 }}>{`Order# ${props?.code}`}</b>
        </div>
      </div>
      <Card noDisplay>
        <Image
          src={'/assets/images/svgs/fridayBlackLogo.svg'}
          height={50}
          width={170}
          alt="logo"
          style={{
            marginBottom: 20,
          }}
        />

        <Table className=" table table-bordered">
          <thead>
            <tr>
              <td colSpan={5} className="">
                <h3>{`Order# ${props?.code}`}</h3>
              </td>
              <td colSpan={2} className="">
                <p>
                  {GetLocalTime(props?.date)} - {GetLocalDate(props?.date)}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <tr>WLA #</tr>
                <b>{props?.externalId ?? '-'}</b>
              </td>
              <td>
                <tr>POS ID#</tr>
                <b>{`${props?.posOrderId}`}</b>
              </td>
              <td>
                <tr>Total Amount</tr>
                <b>{`${
                  props?.netAmount ? props?.netAmount.toFixed(2) : '-'
                }`}</b>
              </td>
              <td>
                <tr>Store Name</tr>
                <b>{`${props?.storeName ?? '-'}`}</b>
              </td>
              <td>
                <tr>Terminal Name</tr>
                <b>{`${props?.terminalName ?? '-'}`}</b>
              </td>
              <td>
                <tr>Customer</tr>
                <b>
                  {`${props?.customer?.firstName ?? '-'} ${
                    props?.customer?.lastName ?? ''
                  } (${props?.customer?.phoneNumber})`}
                </b>
              </td>
              <td>
                <tr>Customer Area</tr>
                <b>{`${props?.customer?.address ?? '-'} `}</b>
              </td>
            </tr>
            <tr>
              <td>
                <tr>Order Status</tr>
                <b>{`${props?.lastStatus ?? '-'}`}</b>
              </td>
              <td>
                <tr>Payment Method</tr>
                <b>{`${props?.orderPayments[0].paymentMethodName ?? '-'}`}</b>
              </td>
              <td>
                <tr>Order Source</tr>
                <b>{`${
                  props?.source === 0
                    ? 'WLA Web'
                    : props?.source === 1
                    ? 'WLA Mobile'
                    : props?.source === 2
                    ? 'POS'
                    : '-'
                }`}</b>
              </td>
              <td>
                <tr>Refund Status</tr>
                <b>{`${props?.isRefunded ? 'Refunded' : 'Not Refunded'}`}</b>
              </td>
              <td>
                <tr>Order Reprint Count</tr>
                <b>{`${props?.noOfRePrints ?? '-'}`}</b>
              </td>
              <td>
                <tr>Notes</tr>
                <tr>-</tr>
              </td>{' '}
              <td>
                <tr>Delivery Address</tr>
                <b>{`${props?.orderDelivery?.address ?? '-'}`}</b>
              </td>
            </tr>
          </thead>
        </Table>
        <div
          className="row pt-4"
          style={{ borderTop: '2px solid rgba(36, 40, 44, 0.1)' }}
        />
        <div
          className="friday-card-header"
          style={{ paddingLeft: 0, border: 'none' }}
        >
          <h6 className="friday-card-title">Products</h6>
        </div>
        <div className="row">
          {props?.orderProducts?.map((prod: any, index: number) => (
            <>
              <ProductCard key={index} prod={prod} />
            </>
          ))}
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-12 col-md-6 ">
            <div className="custom-flex-col custom-header-wrapper">
              <div className="custom-flex-start">
                <div className="pe-4">
                  <div className="row">
                    <div className="col">
                      <h5>Discount</h5>
                    </div>
                    <div className="col">
                      <ToggleButton
                        toggleTitle={'Loyalty'}
                        toggleTitleTab={'Coupon'}
                        isLineDisabled={false}
                      />
                    </div>
                  </div>
                  {activeTab === TOGGLE_OPTIONS.header ? (
                    <Loyalty {...props} />
                  ) : (
                    <Coupon {...props} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 d-flex justify-content-end">
            <div>
              {discountTable.map((item: any, index) => {
                return (
                  <tr key={index}>
                    <td style={{ paddingRight: 20, paddingTop: 10 }}>
                      <b>{`${item.name}`}:</b>
                    </td>
                    <td>
                      <b>{`${item.value}`}</b>
                    </td>
                  </tr>
                );
              })}
            </div>
          </div>
        </div>
        <hr />
        <h5>System Logs</h5>
        <Logs {...props} />
      </Card>
    </div>
  );
};

export default StatsTable;
