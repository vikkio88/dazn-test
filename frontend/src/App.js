import React from 'react';
import { Provider } from 'react-redux';
import Main from './views/Main';

import { store } from 'store';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
