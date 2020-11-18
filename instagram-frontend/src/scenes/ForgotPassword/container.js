import { connect } from 'react-redux';

// import notify from notifications component
import { forgotPassword } from './actions';
import ForgotPasswordPage from './ForgotPasswordPage.jsx';


const mapStateToProps = (state) => ({
  isLoggedIn: !!state.global.user.currentUser,
  loading: !!state.global.loading.isLoading,
});

const mapDispatchToProps = {
  forgotPassword, // rename method?
  // notify,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);