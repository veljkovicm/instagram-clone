import { connect } from 'react-redux';

import UserPage from './User.jsx';
import {
  postComment,
} from '../Feed/actions.js';
import { getUser } from './actions.js';

const mapDispatchToProps = {
  postComment,
  getUser,
}

export default connect(null, mapDispatchToProps)(UserPage);