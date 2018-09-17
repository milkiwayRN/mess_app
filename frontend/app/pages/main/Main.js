import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LoginForm from '../login';
import Placeholder from '../placeholder';
import PrivateRoute from '../../components/privateRoute';

class App extends Component {
    propTypes = {
        user: PropTypes.object,
        isLoadingUser: PropTypes.bool,
    };

    render() {
        const { user, isLoadingUser } = this.props;
        return (
            !isLoadingUser ?
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
                :
                <div> some spinner </div>
        );
    }
}

export default App;
