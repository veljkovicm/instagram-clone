import SinglePostPageComponent from './container.js';


export default {
  path: '/p/:postId',
  title: 'Feed', // dinamically change the title based on post owner
  component: SinglePostPageComponent,
  protected: false,
};
