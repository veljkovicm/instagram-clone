import { connect } from 'react-redux';

// import notify from notifications component
import { login } from './actions.js';
import LoginPage from './LoginPage.jsx';


const mapStateToProps = (state) => ({
  isLoggedIn: !!state.global.user.currentUser,
  loading: !!state.global.loading.isLoading,
});

const mapDispatchToProps = {
  login,
  // notify,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);