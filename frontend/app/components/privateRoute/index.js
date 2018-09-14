import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuthorised, component: Component, ...rest }) => (
    <Route
        { ...rest }
        render={ props =>
            (isAuthorised ? (
                <Component { ...props } />
            ) : (
                <Redirect
                    to={ {
                        pathname: '/login',
                    } }
                />
            ))
        }
    />
);

export default PrivateRoute;
