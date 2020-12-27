import { connect } from 'react-redux';

import SinglePostPage from './SinglePost.jsx';
import {
  postComment,
  likeAction,
} from 'components/Post/actions'
import { getPost } from './actions';

const mapDispatchToProps = {
  postComment,
  getPost,
  likeAction,
}

export default connect(null, mapDispatchToProps)(SinglePostPage);