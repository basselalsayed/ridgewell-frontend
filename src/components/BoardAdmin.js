import React, { useState } from 'react';

import { Holidays } from './holidays';
import { menuBtn, open, menuBtnBurger } from './menu.module.css';
const BoardAdmin = () => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div className='container'>
      <div className={[menuBtn, isOpen ? open : ''].join(' ')}>
        <div onClick={() => setisOpen(!isOpen)} className={menuBtnBurger}></div>
      </div>
      <header className='jumbotron'>
        <Holidays />
      </header>
    </div>
  );
};

export { BoardAdmin };
