import { connect } from 'react-redux';
import Post from './Post.jsx';
import {
  postComment,
  likeAction,
} from './actions.js';

const mapDispatchToProps = {
  postComment,
  likeAction,
}

export default connect(null, mapDispatchToProps)(Post);