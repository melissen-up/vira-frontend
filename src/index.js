// import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

// import { Provider } from 'react-redux'
// import store from './redux/store'

import App from './components/App';

import 'semantic-ui-css/semantic.min.css'

// import 'fontsource-roboto';
// import './index.css'


ReactDOM.render(
    <Router>
      <App />
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
