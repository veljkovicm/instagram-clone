import { connect } from 'react-redux';
import FeedPage from './FeedPage.jsx';
import { upload, getPosts } from './actions';

const mapStateToProps = (state) => ({
  user: state.global.user.currentUser,
});

const mapDispatchToProps = { upload, getPosts };

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
