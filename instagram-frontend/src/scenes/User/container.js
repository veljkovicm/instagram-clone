import { connect } from 'react-redux';

import UserPage from './User.jsx';
import {
  postComment,
} from '../Feed/actions.js';
import {
  getUser,
  uploadAvatar,
  followUser,
  unfollowUser,
  getFollowList,
} from './actions.js';

const mapDispatchToProps = {
  postComment,
  getUser,
  uploadAvatar,
  followUser,
  unfollowUser,
  getFollowList,
}

export default connect(null, mapDispatchToProps)(UserPage);