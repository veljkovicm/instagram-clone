import LoginPageComponent from './container';
import AuthPageReducer from './reducer';

export default {
  path: '/sign_in',
  component: LoginPageComponent,
  reducer: AuthPageReducer,
  protected: false,
};
