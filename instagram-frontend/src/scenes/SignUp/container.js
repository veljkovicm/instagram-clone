import { connect } from 'react-redux';
import { signup, checkAvailability } from './actions';
import SignupPage from './SignupPage.jsx';


const mapStateToProps = (state) => ({
  isLoggedIn: !!state.global.user.currentUser,
  loading: !!state.global.loading.isLoading,
});

const mapDispatchToProps = {
  signup,
  checkAvailability,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
