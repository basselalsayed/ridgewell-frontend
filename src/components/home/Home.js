import React, { useEffect, useMemo } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getHolidays } from '../../actions';
import { Event } from './Event';

const localizer = momentLocalizer(moment);

const Home = () => {
  const { holidays } = useSelector(state => state.contentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHolidays());
  }, []);

  const getHolidayEvents = () =>
    holidays.map(({ from, holidayRequests, until, user: { username } }) => ({
      holidayRequests,
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

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');

    if (title)
      return (events = [
        ...events,
        {
          title,
          start,
          end,
        },
      ]);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log(event);
    // let backgroundColor = '#' + event.hexColor;
    let backgroundColor = 'red';
    let style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };

  return (
    <div>
      <Calendar
        selectable
        popup
        localizer={localizer}
        events={events || []}
        style={{ height: 800 }}
        onSelectSlot={handleSelect}
        // onSelectEvent={event => alert(event.title)}
        components={{
          event: Event,
        }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};
// <header className='jumbotron'>
// </header>

export { Home };
