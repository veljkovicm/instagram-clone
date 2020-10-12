import SignupPageComponent from './container.js';
import SignupPageReducer from './reducer.js';

export default {
  path: '/sign_up',
  title: 'Sign up',
  component: SignupPageComponent,
  reducer: SignupPageReducer,
  protected: false,
};
