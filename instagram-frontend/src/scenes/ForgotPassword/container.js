import { connect } from 'react-redux';
import { forgotPassword } from './actions';
import ForgotPasswordPage from './ForgotPasswordPage.jsx';


const mapStateToProps = (state) => ({
  isLoggedIn: !!state.global.user.currentUser,
  loading: !!state.global.loading.isLoading,
});

const mapDispatchToProps = {
  forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);