import React from 'react';
import rockGlass from '../images/rockGlass.svg';
import '../style/components/logo.css';

const logo = () => (
  <div className="logo">
    <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
      Glass
    </object>
    <h1>delivery</h1>
  </div>
);

export default logo;
