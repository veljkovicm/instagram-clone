import { connect } from 'react-redux';

import { checkUser } from '../../user/actions.js';

import ProtectedRoute from './ProtectedRoute.jsx';

import { stopLoading } from '../../../templates/components/Loading/actions.js';

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.global.user.currentUser,
  loading: state.global.loading.isLoading,
});


const mapDispatchToProps = {
  checkUser,
  stopLoading,
}


export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
