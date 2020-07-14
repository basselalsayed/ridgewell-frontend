import React, { useState } from 'react';

import { menuBtn, open, menuBtnBurger } from './burger.module.css';

const Burger = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <div className={[menuBtn, isOpen ? open : ''].join(' ')}>
      <div onClick={() => setisOpen(!isOpen)} className={menuBtnBurger} />
    </div>
  );
};

export { Burger };
