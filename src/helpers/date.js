import { addMonths, format } from 'date-fns';
import { formats, today } from '../constants';

const formatted = (date, type) => format(new Date(date), formats[type]);

const plusTwoMonths = date => addMonths(new Date(date), 2);

const getMin = (update, date) =>
  update ? formatted(today, 'form') : formatted(plusTwoMonths(date), 'form');

export { getMin };
