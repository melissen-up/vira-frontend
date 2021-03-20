// import logo from './logo.svg';
// import './App.css';
import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./Home"
import Splash from "./Splash"

function App() {

  const [ splash, setSplash ] = useState(false)

  
  return (
    <Switch path="/">
      <Route>
        <Home />
      </Route>
    
      <Route>
        <Splash path="/splash"/>
      </Route>

    </Switch>
  );
}

export default App;
