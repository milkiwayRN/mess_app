import { connect } from 'react-redux';

import UserMainPAge from './UserMainPage';
import { requestUserDialogsIds } from '../../actions/DialogsActions';

const connectedUserMainPAge = connect(
    state => ({
        dialogs: state.dialogs,
    }),
    {
        requestUserDialogsIds,
    },
);

export default connectedUserMainPAge(UserMainPAge);
