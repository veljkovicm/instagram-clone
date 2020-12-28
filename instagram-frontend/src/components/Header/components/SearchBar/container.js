import { connect } from 'react-redux';
import { search } from './actions';
import SearchBar from './SearchBar.jsx';

const mapDispatchToProps = {
  search,
};

export default connect(null, mapDispatchToProps)(SearchBar);