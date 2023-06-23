/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from '@fridayfood/ui-toolkit';
import { useRef } from 'react';
import QRcode from 'react-qr-code';
import { useReactToPrint } from 'react-to-print';

type CustomPropTypes = {
  open: boolean;
  onClose: () => void;
  data: string;
};

const QRGenerator = ({ open, onClose, data }: CustomPropTypes) => {
  const WLAURL = `https://app.myway.techverxcloud.com?storeId=${data}`;
  const ref = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  return (
    <Modal
      show={open}
      customOkHeading="Print"
      close={onClose}
      handleSave={handlePrint}
      title={'QR Code'}
      customClass={true}
      modalWidth="custom-small-modal"
    >
      <div className="d-flex justify-content-center align-items-center flex-column h-50">
        <QRcode ref={ref} value={WLAURL} className="print-qr-code" />
        <a className="mt-2" href={WLAURL}>
          {WLAURL}
        </a>
      </div>
    </Modal>
  );
};

export default QRGenerator;
