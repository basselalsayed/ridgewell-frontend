import React, { useEffect } from 'react';

import { getHolidays } from '../store/actions/content';
import { connect } from 'react-redux';
import { Card, Spinner } from 'react-bootstrap';

const BoardAdmin = ({ holidays, getHolidays }) => {
  useEffect(() => {
    getHolidays();
  }, []);

  return (
    <div className='container'>
      <header className='jumbotron'>
        <div>
          {holidays ? (
            holidays.map(hol => <p>{hol.from}</p>)
          ) : (
            <Spinner animation='border' />
          )}
        </div>
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
