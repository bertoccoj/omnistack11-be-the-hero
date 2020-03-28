import React from 'react';

function Header({ children, props }) {
  return (
    <header>
      <h1>{ children }</h1>
    </header>
  );
}

export default Header;