import { connect } from 'react-redux';

// import notify from notifications component
import { search } from './actions.js';
import SearchBar from './SearchBar.jsx';


const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {
  search,
  // notify,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);