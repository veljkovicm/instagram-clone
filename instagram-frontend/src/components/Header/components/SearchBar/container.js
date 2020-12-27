import { connect } from 'react-redux';
import { search } from './actions';
import SearchBar from './SearchBar.jsx';
// import notify from notifications component

const mapDispatchToProps = {
  search,
  // notify,
};

export default connect(null, mapDispatchToProps)(SearchBar);