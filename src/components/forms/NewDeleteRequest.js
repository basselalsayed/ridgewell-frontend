import React from 'react';
import { useFormikContext } from 'formik';
import { Button } from 'react-bootstrap';

import axios from 'axios';

import { useDispatch } from 'react-redux';
import { getHolidays } from '../../store/actions';
import { dangerBtn } from '../index.module.css';

const NewDeleteRequest = ({ holidayId }) => {
  const dispatch = useDispatch();
  const { setStatus, setSubmitting } = useFormikContext();

  return (
    <Button
      onClick={async () => {
        setSubmitting(true);
        await axios
          .post('requests', { holidayId, type: 'delete' })
          .then(({ data: { message } }) => setStatus(message))
          .catch(err => {
            setStatus(
              `${err.response.statusText}: ${err.response.data.message}`,
            );
          })
          .finally(() => setSubmitting(false));

        dispatch(getHolidays());
      }}
      className={dangerBtn}
    >
      Delete Holiday
    </Button>
  );
};

export { NewDeleteRequest };
