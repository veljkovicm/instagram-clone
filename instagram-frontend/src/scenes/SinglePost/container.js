import { connect } from 'react-redux';

import SinglePostPage from './SinglePost.jsx';
import {
  postComment,
} from '../Feed/actions.js';
import { getPost } from './actions.js';

const mapDispatchToProps = {
  postComment,
  getPost,
}

export default connect(null, mapDispatchToProps)(SinglePostPage);