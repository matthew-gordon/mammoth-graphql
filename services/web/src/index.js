import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { MammothProvider } from './context/mammoth'
import configureClient from './client'

const client = configureClient()

ReactDOM.render(
  <MammothProvider client={client}>
    <App />
  </MammothProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
