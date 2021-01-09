import { connect } from 'react-redux';
import NavigationMenu from './NavigationMenu.jsx';
import { clearUser } from 'core/user/actions';

const mapStateToProps = (state) => ({
  avatar: state.global.user.currentUser && state.global.user.currentUser.avatar,
})

const mapDispatchToProps = {
  clearUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);