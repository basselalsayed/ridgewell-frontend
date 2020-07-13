import React, { useState, useEffect } from 'react';

import HolidayService from '../services/holiday.service';
import { getHolidyas } from '../store/actions/content';
import { connect } from 'react-redux';

const BoardAdmin = ({ holidays, getHolidays }) => {
  useEffect(() => {
    getHolidays();
  }, []);

  return (
    <div className='container'>
      <header className='jumbotron'>
        <div>{holidays && holidays.forEach(hol => <p>{hol.from}</p>)}</div>
      </header>
    </div>
  );
};

const mapStateToProps = state => ({
  holidays: state.contentReducer.holidays,
});

const mapDispatchToProps = dispatch => ({
  getHolidays: () => dispatch(getHolidyas()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardAdmin);
