import React from 'react';

import Chat from '../components/Chat/Chat';
import Join from '../components/Join/Join';
import Home from '../components/Home/home';
import Track from '../components/Track/Track';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/track" exact component={Track} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/join" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
