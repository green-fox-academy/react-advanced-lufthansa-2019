import mainReducer from './pages/main/mainReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    main: mainReducer
});
