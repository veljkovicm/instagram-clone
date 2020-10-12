import { connect } from 'react-redux';

import { checkUser } from '../../user/actions.js';

import ProtectedRoute from './ProtectedRoute.jsx';


const mapStateToProps = (state) => ({
  isLoggedIn: !!state.global.user.currentUser,
  loading: state.global.loading.isLoading,
});


const mapDispatchToProps = {
  checkUser,
}


export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
