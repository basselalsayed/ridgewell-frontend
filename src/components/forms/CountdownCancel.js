import React from 'react';
import { useFormikContext } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { endCountdown } from '../../store/actions/countdown';

const CountdownCancel = () => {
  const dispatch = useDispatch();
  const { submitForm } = useFormikContext();

  const { isPlaying, show } = useSelector(state => state.countdownReducer);

  return (
    show && (
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={5}
        colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
        onComplete={() => {
          submitForm();
          dispatch(endCountdown());
        }}
      >
        <div className='timer'>
          <button className='text' onClick={() => dispatch(endCountdown())}>
            Cancel
          </button>
        </div>
      </CountdownCircleTimer>
    )
  );
};

export { CountdownCancel };
