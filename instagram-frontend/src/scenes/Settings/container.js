import { connect } from 'react-redux';
import SettingsPage from './SettingsPage.jsx';
import { uploadAvatar } from '../User/actions';
import { updateSettings } from './actions';

const mapStateToProps = (state) => ({
  user: state.global.user.currentUser,
});

const mapDispatchToProps = {
  uploadAvatar,
  updateSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);