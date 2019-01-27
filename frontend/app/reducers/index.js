import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { user } from './UserReducer';
import { loading } from './LoadingReducer';
import { dialogs } from './DialogsReducer';

export default combineReducers({
    routing: routerReducer,
    user,
    loading,
    dialogs,
});
