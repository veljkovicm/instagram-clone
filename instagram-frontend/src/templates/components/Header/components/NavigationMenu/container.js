import { connect } from 'react-redux';
import NavigationMenu from './NavigationMenu.jsx';
import { clearUser } from '../../../../../core/user/actions.js';

const mapDispatchToProps = {
  clearUser,
}

export default connect(null, mapDispatchToProps)(NavigationMenu);