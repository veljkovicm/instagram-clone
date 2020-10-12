import { connect } from 'react-redux';

// import notify from notifications component
import { resetPassword } from './actions.js';
import ResetPasswordPage from './ResetPasswordPage.jsx';


const mapStateToProps = (state) => ({
  isLoggedIn: !!state.global.user.currentUser,
  loading: !!state.global.loading.isLoading,
});

const mapDispatchToProps = {
  resetPassword,
  // notify,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);