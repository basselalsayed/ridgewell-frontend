import React, { useState } from 'react';

import { Holidays } from './holidays';

const BoardAdmin = () => {
  return (
    <div className='container'>
      <header className='jumbotron'>
        <Holidays />
      </header>
    </div>
  );
};

export { BoardAdmin };
