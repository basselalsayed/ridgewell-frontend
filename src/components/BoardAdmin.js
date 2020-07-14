import React from 'react';

import { Holidays } from './holidays';
import classes from './menu.module.css';
const BoardAdmin = () => (
  <div className='container'>
    <div className={classes.menuBtn}>
      <div className={classes.menuBtnBurger}></div>
    </div>
    <header className='jumbotron'>
      <Holidays />
    </header>
  </div>
);

export { BoardAdmin };
