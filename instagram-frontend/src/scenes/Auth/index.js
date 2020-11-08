import LoginPageComponent from './container.js';
import AuthPageReducer from './reducer.js';

export default {
  path: '/sign_in',
  component: LoginPageComponent,
  reducer: AuthPageReducer,
  protected: false,
};
