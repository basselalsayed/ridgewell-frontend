import React from 'react';
import { connect } from 'react-redux';
import Holiday from './holiday';
import { Spinner } from 'react-bootstrap';

const Holidays = ({ holidays }) =>
  holidays ? (
    <div>
      {holidays.map(hol => (
        <Holiday key={hol.id} {...hol} />
      ))}
    </div>
  ) : (
    <Spinner animation='border' />
  );

const mapStateToProps = state => ({
  holidays: state.contentReducer.holidays,
});

export default connect(mapStateToProps)(Holidays);
