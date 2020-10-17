import { connect } from 'react-redux';

// import notify from notifications component

import FeedPage from './FeedPage.jsx';
import { upload, getPosts } from './actions.js';

const mapDispatchToProps = {
  upload,
  getPosts,
}

export default connect(null, mapDispatchToProps)(FeedPage);