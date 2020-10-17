import { connect } from 'react-redux';

// import notify from notifications component

import FeedPage from './FeedPage.jsx';
import { upload } from './actions.js';

const mapDispatchToProps = {
  upload,
}

export default connect(null, mapDispatchToProps)(FeedPage);