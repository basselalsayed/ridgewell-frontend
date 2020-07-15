import React, { useEffect, useMemo } from 'react';

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

  const getHolidayEvents = () =>
    holidays.map(({ from, until, user: { username } }) => ({
      title: username,
      start: new Date(from),
      end: new Date(until),
      style: { backgroundColor: 'orange' },
    }));

  const requestHandler = holReqs =>
    holReqs.map(({ type, from, until, resolved }) => ({
      title: `${type}, Resolved: ${resolved}`,
      start: from && new Date(from),
      end: until && new Date(until),
      style: { backgroundColor: 'orange' },
    }));

  const getRequestEvents = () => {
    let array = [];

    holidays.forEach(
      holReq => (array = [...array, ...requestHandler(holReq.holidayRequests)]),
    );
    return array;
  };

  let events = useMemo(
    () => holidays && [...getHolidayEvents(), ...getRequestEvents()],
    [holidays],
  );

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events || []}
        style={{ height: 800 }}
      />
    </div>
  );
};
// <header className='jumbotron'>
// </header>

export { Home };
