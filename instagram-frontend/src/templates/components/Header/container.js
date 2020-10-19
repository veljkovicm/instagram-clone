import { connect } from 'react-redux';
import Header from './Header.jsx';


const mapStateToProps = (state) => ({
  username: state.global.user.currentUser && state.global.user.currentUser.username,
});

export default connect(mapStateToProps)(Header);