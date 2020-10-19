import UserPageComponent from './container.js';


export default {
  path: '/u/:username',
  title: 'User', // dinamically change the title based on username?
  component: UserPageComponent,
  protected: false,
};
