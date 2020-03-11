import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../Routes';
import UserProvider from '../store/UserProvider';

import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes />
      </Router>
    </UserProvider>
  );
}

export default App;
