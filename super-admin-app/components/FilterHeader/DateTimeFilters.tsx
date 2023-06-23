import { useEffectAfterMount } from '@fridayfood/shared';
import { useEffect, useState } from 'react';
import moment from 'moment';

const initialData = {
  today: false,
  thisWeek: false,
  monthToDate: false,
  yearToDate: false,
  lastThreeMonths: false,
};
const startOfWeek = moment().startOf('week').format('MM-DD-YYYY');

let lastThreeMonthsDate = moment().subtract(3, 'months').calendar();

lastThreeMonthsDate = moment(lastThreeMonthsDate).format('MM-DD-YYYY');

const today = moment().format('MM-DD-YYYY');
const startTime = ' 00:00:00';
const endTime = ' 23:59:00';

const dateNow = new Date();
const firstDateOfWeek = moment(
  new Date(dateNow.getFullYear(), dateNow.getMonth(), 1),
).format('MM-DD-YYYY');
const currentYear = new Date().getFullYear();
const end = today + endTime;

const todaysDate = { start: today + startTime, end };

const thisWeek = {
  start: startOfWeek + startTime,
  end,
};

const thisMonth = {
  start: firstDateOfWeek + startTime,
  end,
};
const lastTHreeMonth = {
  start: lastThreeMonthsDate + startTime,
  end,
};
const yearToDate = {
  start: '01-01-' + currentYear + startTime,
  end,
};

export const DateTimeFilters = ({
  onFilterChange,
}: {
  onFilterChange: (dates: {
    start: string;
    end: string;
    filter?: boolean;
  }) => unknown;
}) => {
  const [filter, setFilter] = useState({ ...initialData, today: true });

  useEffect(() => {
    onFilterChange({ ...todaysDate, filter: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectAfterMount(() => {
    if (filter.today) {
      onFilterChange({ ...todaysDate, filter: filter?.today });
    } else if (filter.thisWeek) {
      onFilterChange({ ...thisWeek, filter: filter.thisWeek });
    } else if (filter.monthToDate) {
      onFilterChange({ ...thisMonth, filter: filter.monthToDate });
    } else if (filter.yearToDate) {
      onFilterChange({ ...yearToDate, filter: filter?.yearToDate });
    } else if (filter.lastThreeMonths) {
      onFilterChange({ ...lastTHreeMonth, filter: filter.lastThreeMonths });
    } else {
      onFilterChange({ ...todaysDate, filter: filter?.today });
    }
  }, [filter]);

  return (
    <div className="custom-flex-start justify-content-end mb-3">
      <button
        onClick={() => {
          setFilter({ ...initialData, today: !filter?.today });
        }}
        className={`friday-btn-primary ${
          filter?.today ? '' : 'outline-btn'
        }   small-btn font-medium m-2`}
        type="button"
      >
        Today
      </button>
      <button
        onClick={() => {
          setFilter({ ...initialData, thisWeek: !filter?.thisWeek });
        }}
        className={`friday-btn-primary ${
          filter?.thisWeek ? '' : 'outline-btn'
        }   small-btn font-medium m-2`}
        type="button"
      >
        This Week
      </button>
      <button
        onClick={() => {
          setFilter({
            ...initialData,
            monthToDate: !filter?.monthToDate,
          });
        }}
        className={`friday-btn-primary ${
          filter?.monthToDate ? '' : 'outline-btn'
        }   small-btn font-medium m-2`}
        type="button"
      >
        Month To Date
      </button>
      <button
        onClick={() => {
          setFilter({
            ...initialData,
            yearToDate: !filter?.yearToDate,
          });
        }}
        className={`friday-btn-primary ${
          filter?.yearToDate ? '' : 'outline-btn'
        }   small-btn font-medium m-2`}
        type="button"
      >
        Year to Date
      </button>
      <button
        onClick={() => {
          setFilter({
            ...initialData,
            lastThreeMonths: !filter?.lastThreeMonths,
          });
        }}
        className={`friday-btn-primary ${
          filter?.lastThreeMonths ? '' : 'outline-btn'
        }   small-btn font-medium m-2`}
        type="button"
      >
        Last 3 months
      </button>
    </div>
  );
};
