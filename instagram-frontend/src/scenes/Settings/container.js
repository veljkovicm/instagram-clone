import { connect } from 'react-redux';

import SettingsPage from './SettingsPage.jsx';

const mapStateToProps = (state) => ({
  user: state.global.user.currentUser,
});

export default connect(mapStateToProps)(SettingsPage);