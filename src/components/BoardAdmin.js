import React, { useEffect } from 'react';

import { getHolidays } from '../store/actions/content';
import { connect } from 'react-redux';
import { Card, Spinner } from 'react-bootstrap';
import Holidays from './holidays';

const BoardAdmin = ({ getHolidays }) => {
  useEffect(() => {
    getHolidays();
  }, []);

  return (
    <div className='container'>
      <header className='jumbotron'>
        <Holidays />
      </header>
    </div>
  );
};

const mapStateToProps = state => ({
  holidays: state.contentReducer.holidays,
});

const mapDispatchToProps = dispatch => ({
  getHolidays: () => dispatch(getHolidays()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardAdmin);
