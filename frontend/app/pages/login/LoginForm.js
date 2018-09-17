import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {
    static propTypes = {
        requestLoginUser: PropTypes.func.isRequired,
        isLoginFail: PropTypes.bool,
    };

    state = {
        email: null,
        password: null,
    };

    onSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        const { email, password } = this.state;
        if (email && password) {
            console.log('Log In OK');
            this.props.requestLoginUser(email, password);
        }
        else {
            console.log('SOMETHING WRONG');
        }
    };

    onChangeHandler(fieldName, event) {
        this.setState({
            [fieldName]: event.target.value,
        });
    }

    bindChangeCB = fieldName => this.onChangeHandler.bind(this, fieldName);

    renderNotification = () => {
        const { isLoginFail } = this.props;
        return isLoginFail ? <div> Incorrect email or passowrd </div> : null;
    };

    render() {
        return (
            <form onSubmit={ this.onSubmit }>
                <label>
                    email
                    <input type="email" onChange={ this.bindChangeCB('email') } />
                </label>
                <label>
                    password
                    <input type="password" onChange={ this.bindChangeCB('password') } />
                </label>
                <input type="submit" value="Log in" />
                { this.renderNotification() }
            </form>
        );
    }
}

export default LoginForm;
