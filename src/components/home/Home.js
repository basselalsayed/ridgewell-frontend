import React, { useEffect, useMemo } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { eventStyleGetter, holidayEvents, requestEvents } from './helpers';
import { Event } from './Event';

import { useSelector, useDispatch } from 'react-redux';
import { getHolidays } from '../../actions';

const localizer = momentLocalizer(moment);

const Home = () => {
  const { holidays } = useSelector(state => state.contentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHolidays());
  }, []);

  let events = useMemo(
    () => holidays && [...holidayEvents(holidays), ...requestEvents(holidays)],
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
        tooltipAccessor={null}
      />
    </div>
  );
};
// <header className='jumbotron'>
// </header>

export { Home };
