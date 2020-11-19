import { connect } from 'react-redux';

import UserPage from './User.jsx';
import {
  getUser,
  uploadAvatar,
  followUser,
  unfollowUser,
  getFollowList,
} from './actions';

const mapStateToProps = (state) => ({
  myUsername: state.global.user.currentUser?.username,
});

const mapDispatchToProps = {
  getUser,
  uploadAvatar,
  followUser,
  unfollowUser,
  getFollowList,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);