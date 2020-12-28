import { connect } from 'react-redux';
import SinglePostPage from './SinglePost.jsx';
import { getPost } from './actions';
import {
  postComment,
  likeAction,
} from 'components/Post/actions';

const mapDispatchToProps = {
  postComment,
  getPost,
  likeAction,
}

export default connect(null, mapDispatchToProps)(SinglePostPage);