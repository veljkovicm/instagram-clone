import { combineReducers } from 'redux';
// import { reducer as notificationReducer } from notification components (in templates?);
import { reducer as loadingReducer } from 'templates/components/Loading'
import { reducer as userReducer } from './user';



export default combineReducers({
  user: userReducer,
  // notification: notificationReducer,
  loading: loadingReducer,
});
