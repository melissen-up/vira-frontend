// import logo from './logo.svg';
// import './App.css';
import { Switch, Route } from "react-router-dom";
// import { useState, useEffect } from "react";

import Home from "./Home"
import Login from "./Login"

function App() {
  
  return (
    <Switch >
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Home} />
    </Switch>
  );
}

export default App;
