import { connect } from 'react-redux';

import SinglePostPage from './SinglePost.jsx';
import {
  postComment,
  likeAction,
} from '../Feed/actions.js';
import { getPost } from './actions.js';

const mapDispatchToProps = {
  postComment,
  getPost,
  likeAction,
}

export default connect(null, mapDispatchToProps)(SinglePostPage);