import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute.jsx';
import { checkUser } from 'core/user/actions';
import { stopLoading } from 'templates/components/Loading/actions';

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.global.user.currentUser,
  loading: state.global.loading.isLoading,
});

const mapDispatchToProps = {
  checkUser,
  stopLoading,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
