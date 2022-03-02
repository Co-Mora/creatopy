import { combineReducers } from 'redux';
import auth from './auth/src/userAuthReducer';
import user from './user/src/homeReducer';

export default combineReducers({
    auth,
    user
});