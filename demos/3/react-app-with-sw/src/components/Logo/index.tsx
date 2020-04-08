import React from 'react';
import './index.css';
import config from '../../config';

const Logo = () => {
  return (
    <img id="logo" src={config.meta.logo} width="75" alt="Moodie Logo"></img>
  );
};

export default Logo;
