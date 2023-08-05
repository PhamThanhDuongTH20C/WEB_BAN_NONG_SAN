import './App.css';
import React from 'react';
import User from './components/User/User';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <User />
      </BrowserRouter>
    </div>
  );
}

export default App;
