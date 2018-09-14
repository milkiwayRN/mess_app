import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';


import history from './history';


import App from './pages/main/';

ReactDOM.render(
    <Router history={ history }>
        <Route component={ App } />
    </Router>,
    document.getElementById('root'),
);
