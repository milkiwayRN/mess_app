import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import history from './history';
import App from './pages/main/';

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history }>
            <Route component={ App } />
        </Router>
    </Provider>,
    document.getElementById('root'),
);
