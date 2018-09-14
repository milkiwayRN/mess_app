import React, { Component } from 'react';

class LoginForm extends Component {
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
            </form>
        );
    }
}

export default LoginForm;
