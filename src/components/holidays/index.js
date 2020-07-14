import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Holiday from './holiday';
import { Spinner } from 'react-bootstrap';
import { getHolidays } from '../../store/actions/content';

const Holidays = ({ holidays, getHolidays }) => {
  useEffect(() => {
    getHolidays();
  }, []);

  return holidays ? (
    <div>
      {holidays.map(hol => (
        <Holiday key={hol.id} {...hol} />
      ))}
    </div>
  ) : (
    <Spinner animation='border' />
  );
};
const mapStateToProps = state => ({
  holidays: state.contentReducer.holidays,
});
const mapDispatchToProps = dispatch => ({
  getHolidays: () => dispatch(getHolidays()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Holidays);
