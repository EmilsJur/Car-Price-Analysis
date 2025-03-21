// src/components/Header.js
import React from 'react';

function Header() {
  return (
    <header>
      <h1>Automašīnu Cenu Analīzes Sistēma</h1>
      <p>Analizējiet automašīnu cenu tendences Latvijas tirgū</p>
      <nav>
        <ul>
          <li><a href="#" className="active">Meklēšana</a></li>
          <li><a href="#">Statistika</a></li>
          <li><a href="#">Tendences</a></li>
          <li><a href="#">Par sistēmu</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;