import { connect } from 'react-redux';
import Post from './Post.jsx';
import {
  postComment,
  likeAction,
  savePostAction,
} from './actions';

const mapDispatchToProps = {
  postComment,
  likeAction,
  savePostAction,
}

export default connect(null, mapDispatchToProps)(Post);