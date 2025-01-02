import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays
} from 'date-fns';
import format from 'date-fns/format';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateFilterProps {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
}

function DateFilter(props: DateFilterProps) {
  const { startDate, setStartDate, endDate, setEndDate } = props;

  const [isCalendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [showValue, setShowValue] = useState<string>('');

  useEffect(() => {
    handleThisMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartDateChange = (date: Date) => {
    const localStartDate = format(date, 'dd-MMM-yyyy');
    const localEndDate = format(endDate, 'dd-MMM-yyyy');

    setShowValue(localStartDate + ' - ' + localEndDate);
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    const localStartDate = format(startDate, 'dd-MMM-yyyy');
    const localEndDate = format(date, 'dd-MMM-yyyy');

    setShowValue(localStartDate + ' - ' + localEndDate);
    setEndDate(date);
  };

  const handleToday = () => {
    const today = new Date();
    setStartDate(startOfDay(today));
    setEndDate(endOfDay(today));
    setShowValue('Today');
  };

  const handleYesterday = () => {
    const yesterday = subDays(new Date(), 1);
    setStartDate(startOfDay(yesterday));
    setEndDate(endOfDay(yesterday));
    setShowValue('Yesterday');
  };

  const handleThisWeek = () => {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 });
    const endOfCurrentWeek = endOfWeek(today, { weekStartsOn: 0 });
    setStartDate(startOfDay(startOfCurrentWeek));
    setEndDate(endOfDay(endOfCurrentWeek));
    setShowValue('This Week');
  };

  const handleLastWeek = () => {
    const today = new Date();
    const startOfLastWeek = startOfWeek(subDays(today, 7), { weekStartsOn: 0 });
    const endOfLastWeek = endOfWeek(subDays(today, 7), { weekStartsOn: 0 });
    setStartDate(startOfDay(startOfLastWeek));
    setEndDate(endOfDay(endOfLastWeek));
    setShowValue('Last Week');
  };

  const handleThisMonth = () => {
    const today = new Date();
    const startOfCurrentMonth = startOfMonth(today);
    const endOfCurrentMonth = endOfMonth(today);
    setStartDate(startOfDay(startOfCurrentMonth));
    setEndDate(endOfCurrentMonth);
    setShowValue('This Month');
  };

  const handleLastMonth = () => {
    const today = new Date();
    const startOfLastMonth = startOfMonth(subDays(today, today.getDate()));
    const endOfLastMonth = endOfDay(subDays(today, 1));
    setStartDate(startOfDay(startOfLastMonth));
    setEndDate(endOfLastMonth);

    setShowValue('Last Month');
  };

  const handleThisYear = () => {
    const today = new Date();
    const startOfCurrentYear = startOfYear(today);
    const endOfCurrentYear = endOfYear(today);
    setStartDate(startOfDay(startOfCurrentYear));
    setEndDate(endOfCurrentYear);

    setShowValue('This Year');
  };

  const handleLastYear = () => {
    const today = new Date();
    const startOfLastYear = startOfYear(subDays(today, 365)); // Use 365 for a non-leap year
    const endOfLastYear = endOfDay(subDays(today, 1));
    setStartDate(startOfDay(startOfLastYear));
    setEndDate(endOfLastYear);

    setShowValue('Last Year');
  };

  const handleAllTime = () => {
    const startOfAllTime = new Date(2001, 0, 1); // January 1, 2001
    const today = new Date();
    setStartDate(startOfDay(startOfAllTime));
    setEndDate(endOfDay(today));

    setShowValue('All Time');
  };

  return (
    <div className="relative">
      <button
        id="dropdownRadioButton"
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        onClick={() => setCalendarOpen(!isCalendarOpen)}
      >
        <svg
          className="w-3 h-3 text-gray-500 dark:text-gray-400 mr-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
        </svg>
        {showValue}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      {isCalendarOpen && (
        <div className="absolute z-10 flex px-2 py-3 bg-white border border-gray-300 rounded shadow-md left-3">
          <div className="w-20 border-r place-content-start">
            <button className="w-full text-xs text-blue-500 text-start" onClick={handleToday}>
              Today
            </button>
            <button className="w-full text-xs text-blue-500 text-start" onClick={handleYesterday}>
              Yesterday
            </button>
            <button className="w-full text-xs text-blue-500 text-start" onClick={handleThisWeek}>
              This Week
            </button>
            <button className="w-full text-xs text-blue-500 text-start" onClick={handleLastWeek}>
              Last Week
            </button>
            <button className="w-full text-xs text-blue-500 text-start" onClick={handleThisMonth}>
              This Month
            </button>
            <button className="w-full text-xs text-blue-500 text-start" onClick={handleLastMonth}>
              Last Month
            </button>
            <button className="w-full text-xs text-blue-500 text-start" onClick={handleThisYear}>
              This Year
            </button>
            <button className="w-full text-xs text-blue-500 text-start" onClick={handleLastYear}>
              Last Year
            </button>
            <button className="w-full text-xs text-blue-500 text-start" onClick={handleAllTime}>
              All Time
            </button>
          </div>
          <div className="flex flex-col justify-center ml-2 gap-y-1 place-content-start">
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              isClearable
              placeholderText="Start Date"
              className="px-4 py-2 border border-gray-400 rounded focus:outline-none"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              isClearable
              placeholderText="End Date"
              className="px-4 py-2 border border-gray-400 rounded focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DateFilter;
