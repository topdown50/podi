import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Amplify, Hub} from "aws-amplify";
import { AmplifyProvider } from '@aws-amplify/ui-react';
import awsExports from "./aws-exports";
import Popper from '@popperjs/core';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@aws-amplify/ui-react/styles.css';
import { DataStore } from '@aws-amplify/datastore';
import { Logger } from 'aws-amplify';

// window.LOG_LEVEL = 'DEBUG';


Amplify.configure(awsExports)

Hub.listen('auth', async (data) => {
  if (data.payload.event === 'signOut') {
    await DataStore.clear();
  }
});

ReactDOM.render(
  <React.StrictMode>
    <AmplifyProvider>
        <App />
    </AmplifyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
