import './index.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './pages/Routes';

const App: React.FunctionComponent = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
