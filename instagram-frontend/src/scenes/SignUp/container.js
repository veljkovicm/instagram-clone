import { connect } from 'react-redux';

import { signup } from './actions.js';
import SignupPage from './SignupPage.jsx';


const mapStateToProps = (state) => ({
  isLoggedIn: !!state.global.user.currentUser,
  loading: !!state.global.loading.isLoading,
});

const mapDispatchToProps = {
  signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);