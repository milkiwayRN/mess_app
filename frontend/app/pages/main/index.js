import { connect } from 'react-redux';

import App from './Main';

const connectedApp = connect(
    state => ({
        user: state.user,
        isLoadingUser: state.loading.isLoadingUser,
    }),
);

export default connectedApp(App);
