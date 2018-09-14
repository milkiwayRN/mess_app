import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LoginForm from '../login/login';
import Placeholder from '../placeholder';
import PrivateRoute from '../../components/privateRoute';

class App extends Component {
    propTypes = {
        user: PropTypes.object,
    };

    render() {
        const { user } = this.props;
        return (
            <Switch>
                <Route
                    component={ LoginForm }
                    path="/login"
                    exact
                />
                <PrivateRoute
                    component={ Placeholder }
                    isAuthorised={ user }
                    path="/"
                />
            </Switch>
        );
    }
}

export default App;
