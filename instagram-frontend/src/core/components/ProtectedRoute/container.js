import { connect } from 'react-redux';

import ProtectedRoute from './ProtectedRoute.jsx';


const mapStateToProps = (state) => ({ isLoggedIn: !!state.global.user.currentUser });


export default connect(mapStateToProps)(ProtectedRoute);
