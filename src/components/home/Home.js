import React, { useEffect, useMemo, useState } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { eventStyleGetter, holidayEvents, requestEvents } from '../../helpers';
import { Event } from './event';

import { useSelector, useDispatch } from 'react-redux';
import { getHolidays } from '../../store/actions';
import { EventModal } from './event/components';

const localizer = momentLocalizer(moment);

const Home = () => {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
    show && setDate(null);
  };

  const { holidays } = useSelector(state => state.contentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHolidays());
  }, [dispatch]);

  let events = useMemo(
    () => holidays && [...holidayEvents(holidays), ...requestEvents(holidays)],
    [holidays],
  );

  const handleSelect = ({ start, end }) => {
    setDate({ start, end });
    handleShow();
  };

  const modalProps = {
    ...date,
    annualLeave: false,
    handleShow,
    show,
    title: 'New Holiday',
    update: false,
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
        components={{
          event: Event,
        }}
        eventPropGetter={eventStyleGetter}
        tooltipAccessor={null}
      />
      {date && <EventModal {...modalProps} />}
    </div>
  );
};
// <header className='jumbotron'>
// </header>

export { Home };
