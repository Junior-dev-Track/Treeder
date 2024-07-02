import React from 'react'
import ReactDOM from 'react-dom/client'
import Modal from 'react-modal';
import App from './App.jsx'
import './style/App.scss'


Modal.setAppElement('#app');

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 