import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import LoginForm from '../login';
import Placeholder from '../placeholder';
import PrivateRoute from '../../components/privateRoute';
import UserMainPage from '../UserMainPage';

class App extends Component {
    static propTypes = {
        user: PropTypes.object,
        isLoadingUser: PropTypes.bool,
    };

    render() {
        const { user: { email }, isLoadingUser } = this.props;
        return (
            !isLoadingUser ?
                <Switch>
                    <Route
                        component={ LoginForm }
                        path="/login"
                        exact
                    />
                    <PrivateRoute
                        component={ UserMainPage }
                        isAuthorised={ email }
                        path="/"
                    />
                </Switch>
                :
                <div> some spinner </div>
        );
    }
}

export default App;
