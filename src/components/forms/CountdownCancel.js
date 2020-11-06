import React from 'react';
import { useFormikContext } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { endCountdown, getHolidays } from '../../store/actions';
import './countdown.css';
import axios from 'axios';

const CountdownCancel = ({ holidayId }) => {
  const dispatch = useDispatch();
  const { setStatus, setSubmitting, submitForm } = useFormikContext();

  const { isPlaying, isDelete } = useSelector(state => state.countdownReducer);

  const handleDelete = async () => {
    await axios
      .post('requests', { holidayId, type: 'delete' })
      .then(({ data: { message } }) => setStatus(message))
      .catch(err => {
        setStatus(`${err.response.statusText}: ${err.response.data.message}`);
      })
      .finally(() => setSubmitting(false));

    dispatch(getHolidays());
  };

  return (
    isPlaying && (
      <div className='countdownWrp'>
        <CountdownCircleTimer
          children={
            <button
              className='countdownBtn'
              onClick={() => {
                dispatch(endCountdown());
              }}
            >
              <div className='countdownText'>Cancel</div>
            </button>
          }
          isPlaying={isPlaying}
          duration={1}
          size={90}
          strokeWidth={5}
          colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
          onComplete={() => {
            submitForm();
            dispatch(endCountdown());
          }}
        />
      </div>
    )
  );
};

export { CountdownCancel };
