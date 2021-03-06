import { connect } from 'react-redux';
import { resetPassword } from './actions';
import ResetPasswordPage from './ResetPasswordPage.jsx';


const mapStateToProps = (state) => ({
  isLoggedIn: !!state.global.user.currentUser,
  loading: !!state.global.loading.isLoading,
});

const mapDispatchToProps = {
  resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);