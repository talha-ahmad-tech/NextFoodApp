import { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';

export const DateTimeFilters = ({
  onFilterChange,
}: {
  onFilterChange: (dates: {
    start: string;
    end: string;
    filter?: boolean;
  }) => unknown;
}) => {
  const [dateButton, setDateButton] = useState(false);
  const [dateData, setDateData] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const startValue = moment(dateData?.startDate).format('MMM DD, YYYY');
  const endValue = moment(dateData?.endDate).format('MMM DD, YYYY');

  useEffect(() => {
    doneButtonHandler();
  }, []);

  const doneButtonHandler = () => {
    const startUTCDate = moment.utc(dateData?.startDate).format();
    const endUTCDate = moment.utc(dateData?.endDate).format();
    onFilterChange({
      start: startUTCDate,
      end: endUTCDate,
    });
    setDateButton(false);
  };

  return (
    <div className="custom-flex-start justify-content-end w-100">
      {dateButton && (
        <div className="popup-container">
          <DateRangePicker
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(ranges: any) => {
              console.log(ranges, 'RANGES');
              setDateData(ranges.selection);
            }}
            months={2}
            ranges={[dateData]}
            direction="horizontal"
          />
          <div style={{ marginLeft: '700px' }}>
            <button
              className="btn btn-transparent text-primary rounded-0 px-4 mr-2"
              onClick={doneButtonHandler}
            >
              Done
            </button>
            <button
              className="btn btn-transparent text-danger rounded-0 px-4"
              onClick={() => {
                setDateData({
                  startDate: new Date(),
                  endDate: new Date(),
                  key: 'selection',
                });
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
      <div className="rdrDateDisplayWrapper w-100">
        <div
          className="rdrDateDisplay"
          style={{ color: 'rgb(61, 145, 255)' }}
          onClick={() => setDateButton(true)}
        >
          <span className="rdrDateInput rdrDateDisplayItem rdrDateDisplayItemActive">
            <input readOnly placeholder="Early" value={startValue} />
          </span>

          <span className="rdrDateInput rdrDateDisplayItem">
            <input readOnly placeholder="Continuous" value={endValue} />
          </span>
        </div>
      </div>
    </div>
  );
};
