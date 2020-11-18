import { connect } from 'react-redux';
import FeedPage from './FeedPage.jsx';
import { upload, getPosts } from './actions';

// import notify from notifications component

const mapDispatchToProps = { upload, getPosts };

export default connect(null, mapDispatchToProps)(FeedPage);
