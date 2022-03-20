import React, { Fragment } from 'react';
//import {BrowserRouter, Router, Switch, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import {Register} from './components/auth/Register';
import {Login} from './components/auth/Login';

import './App.css';

const App = ()=> (
  <Fragment>
    <Navbar />
    <Landing />
  </Fragment>
)
export default App;
