import React, { useState, useEffect } from 'react';

import HolidayService from '../services/holiday.service';

const BoardAdmin = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    HolidayService.allHolidays().then(
      response => {
        setContent(response.data.holidays);
      },
      error => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      },
    );
  }, []);

  return (
    <div className='container'>
      <header className='jumbotron'>
        <div>{content && content.forEach(hol => <p>{hol.from}</p>)}</div>
      </header>
    </div>
  );
};

export default BoardAdmin;
