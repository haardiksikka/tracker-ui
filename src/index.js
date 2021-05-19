import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, Switch,BrowserRouter  } from 'react-router-dom';
import LiveLocation from "./LiveLocaction"


ReactDOM.render(
  <React.StrictMode>
    
    <BrowserRouter>
        <Switch>
         <Route exact path="/track" component = {App} />
         <Route exact path="/locate" component = {LiveLocation} />
         </Switch>   
   </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
