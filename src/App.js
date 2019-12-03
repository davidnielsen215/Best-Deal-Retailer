import React from 'react';
import logo from './LogoArrow.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Best Deal Retailer Login 
        </p>
        <a
          className="App-link"
          href="https://seetheit.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>

        <br></br>
                    <label className="password">Email</label>
                    <br></br>
                    <input className="login-input"
                        name="username"
                        type="username"
                        autoComplete='off'/>
                        <br></br>
                    <label className="password">Password</label>
                    <br></br>
                    <input className="login-input"
                        name="password"
                        type="password"
                        autoComplete='off'/>
      </header>
    </div>
  );
}

export default App;
