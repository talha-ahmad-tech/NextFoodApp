import React, { useContext } from 'react';
import Modal from '@fridayfood/ui-toolkit/src/Modal';
import Loader from '@fridayfood/ui-toolkit/src/Loader';
import TableGrid from '../AgGrid/clientGrid';
import {
  QuickViewContext,
  QuickViewDispatchContext,
} from '../Context/QuickViewContext';
export interface IQuickListView {
  show?: boolean;
  colsDef: any;
  rowData: any;
  loading: boolean;
}
const QuickListView = ({
  show = false,
  colsDef,
  rowData = [],
  loading = false,
}: IQuickListView) => {
  const config = useContext(QuickViewContext);
  const setConfig = useContext(QuickViewDispatchContext);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Modal
          hideFooter
          show={show}
          close={() => {
            setConfig({
              ...config,
              show: false,
            });
          }}
          title={config?.title}
        >
          {rowData?.length ? (
            <TableGrid rowData={rowData} columnDefs={colsDef} />
          ) : (
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '0 auto',
              }}
            >
              No Record Found
            </p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default QuickListView;
