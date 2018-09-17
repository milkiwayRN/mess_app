import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import { requestLoginUser } from '../../actions/UserActions';

const connectedLoginForm = connect(
    state => ({
        isLoginFail: state.user.isLoginFail,
        user: state.user,
    }),
    {
        requestLoginUser,
    },
);

export default connectedLoginForm(LoginForm);
