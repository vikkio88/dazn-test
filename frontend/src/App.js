import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from './components/nav';
import { Dashboard, Login, Stream } from './views';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="App-body">
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/stream/:videoId" component={Stream} />
        </div>
      </div>
    </Router>
  );
}

export default App;
