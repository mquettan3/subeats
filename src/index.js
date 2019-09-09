import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Require Jquery
import './loader.js';

// Bootstrap Styles
import 'bootstrap/dist/css/bootstrap.css';
require('bootstrap');

// Font Awesome important
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js'

// Custom Styles
import './assets/css/theme-1.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
