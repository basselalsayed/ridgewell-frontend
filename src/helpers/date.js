import { addMonths, format } from 'date-fns';
import { formats, today } from '../constants';

const formatted = (date, type) => format(new Date(date), formats[type]);

const plusTwoMonths = date => addMonths(new Date(date), 2);

const getMin = (annualLeave, date, update) =>
  !update && annualLeave
    ? formatted(plusTwoMonths(today), 'form')
    : formatted(today, 'form');

export { formatted, getMin };
