import { connect } from 'react-redux';

// import notify from notifications component

import FeedPage from './FeedPage.jsx';
import {
  upload,
  getPosts,
  postComment,
} from './actions.js';

const mapDispatchToProps = {
  upload,
  getPosts,
  postComment,
}

export default connect(null, mapDispatchToProps)(FeedPage);