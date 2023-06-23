import { dateFormatter, timeFormatter } from '@/utils/helper';
import moment from 'moment';
import { useFetchOrderStatusQuery } from 'services/modules/orderhistory.api';

const Logs = (props: any) => {
  const { data } = useFetchOrderStatusQuery(props?.id);
  return (
    <>
      <ul className="timeline">
        {data?.map((item: any, index: number) => {
          return (
            <li>
              <b
                style={{
                  color:
                    index === data.length - 1 &&
                    item.status === 'OrderCompleted'
                      ? 'green'
                      : index === data.length - 1 &&
                        item.status === 'OrderCancelled'
                      ? 'red'
                      : '',
                }}
              >
                {item.status}
              </b>
              <tr>{`${moment(item.dateTime).format('YYYY-MM-DD')} ${moment(
                item.dateTime,
              ).format('LT')}
      `}</tr>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Logs;
