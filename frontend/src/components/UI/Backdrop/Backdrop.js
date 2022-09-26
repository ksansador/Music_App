import React from 'react';
import './Backdrop.css';

const Backdrop = ({show, clicked}) => {
  return show ? <div className="Backdrop" onClick={clicked} /> : null;
};

export default Backdrop;