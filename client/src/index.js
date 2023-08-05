import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider as AlertProvider, transitions,positions} from "react-alert"
import AlertTemplate from "react-alert-template-basic"
import App from './App';

const options={
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
);

