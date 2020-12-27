import { combineReducers } from 'redux';
import { reducer as loadingReducer } from 'components/Loading'
import { reducer as userReducer } from './user';



export default combineReducers({
  user: userReducer,
  loading: loadingReducer,
});
