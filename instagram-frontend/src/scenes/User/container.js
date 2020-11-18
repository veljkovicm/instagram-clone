import { connect } from 'react-redux';

import UserPage from './User.jsx';
import {
  getUser,
  uploadAvatar,
  followUser,
  unfollowUser,
  getFollowList,
} from './actions';

const mapDispatchToProps = {
  getUser,
  uploadAvatar,
  followUser,
  unfollowUser,
  getFollowList,
}

export default connect(null, mapDispatchToProps)(UserPage);