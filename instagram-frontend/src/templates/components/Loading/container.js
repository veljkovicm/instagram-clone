import { connect } from 'react-redux';

import Loading from './Loading.jsx';


const mapStateToProps = (state) => ({
  isLoading: state.global.loading.isLoading,
});


export default connect(mapStateToProps)(Loading);
