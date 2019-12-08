import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Main from './views/Main';

import { store } from 'store';

import './App.css';

class App extends Component {


  render() {

    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
