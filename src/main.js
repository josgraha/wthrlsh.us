import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
require('./styles/main.scss');
require('./styles/weather-svg-data.scss');
require('./styles/icons-svg-sprite.scss');

ReactDOM.render(<App />, document.getElementById('app'));
