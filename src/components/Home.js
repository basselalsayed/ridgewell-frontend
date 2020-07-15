import React, { useEffect } from 'react';

import { Users } from './users';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getHolidays } from '../actions';

const localizer = momentLocalizer(moment);

const Home = () => {
  const { holidays } = useSelector(state => state.contentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHolidays());
  }, []);

  let array = [];

  holidays &&
    holidays.forEach(({ from, until, owner }) =>
      array.push({ title: owner, start: new Date(from), end: new Date(until) }),
    );

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={array}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
      />
    </div>
  );
};
// <header className='jumbotron'>
// </header>

export { Home };
