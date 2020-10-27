import { connect } from 'react-redux';

// import notify from notifications component

import FeedPage from './FeedPage.jsx';
import {
  upload,
  getPosts,
  postComment,
  likeAction,
} from './actions.js';

const mapDispatchToProps = {
  upload,
  getPosts,
  postComment,
  likeAction,
}

export default connect(null, mapDispatchToProps)(FeedPage);