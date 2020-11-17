import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './SearchBar.css';

const SearchBar = (props) => {
  const [ result, setResult ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ showSearch, setShowSearch ] = useState(false);
  const [ focus, setFocus ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ backdropVisible, setBackdropVisible ] = useState(false);

  const {
    search,
    //get loading from props?
  } = props;
  let markup;
  const handleInputChange = async (e) => {
    if(e.target.value.length === 0) {
      setResult([])
    }
    setSearchQuery(e.target.value);
    setLoading(true);
    await search({ query: e.target.value}).then((res) => {
      setLoading(false);
      setResult(res);
      console.log(res);
      console.log('>> result', result);
      setShowSearch(true);
    })
    // setResult(searchResult);
    
  }
  if(result.length > 0) {
    markup = (
      result.map((user, i) => {
        return <a href={`/u/${user.username}`} className="search__results__single" key={i}>
          <div className="search__results__single__image"><img src={user.imageUrl} /></div>
          <div className="search__results__single__info">
          <span className="search__results__single__username">{user.username}</span>
          <span className="search__results__single__name">{user.fullName}</span>
          </div>
        </a>
      })
    )
  } else if (result.length < 1 && searchQuery !== '') {
    markup = (
      <div>Not found</div>
    )
  }
  const handleClearInput = () => {
    setSearchQuery('');
    setShowSearch(false);
    setResult([]);
    setFocus(false);
  }
  const handleFocus = () => {
    setFocus(true);
    setShowSearch(true);
    setBackdropVisible(true);
  }

  const handleBackdropClick = () => {
    setFocus(false);
    setShowSearch(false);
    setBackdropVisible(false);
  }
  

  const showMarkup = showSearch && focus && !loading // !loading causes result flickering on input change; remove


  return (
    <div className="search">
      <div className={`backdrop${backdropVisible ? ' show' : ''}`} onClick={handleBackdropClick}></div>
        <form className="search__form">
          <input
            type="text"
            placeholder="Search"
            onChange={handleInputChange}
            value={searchQuery}
            // onBlur={handleBlur}
            onFocus={handleFocus}
            className="search__form__input"
            />
          { focus && <span onClick={handleClearInput} className="search__form__clear">x</span>} {/*clear input */}
          { loading && <span className="search__form__loading">L</span> } {/*loading indicator */}
        </form>
        <div className="search__results">
          {showMarkup && markup}
        </div>
    </div>
  )
}

SearchBar.propTypes = {
  search: PropTypes.func.isRequired,
}

export default SearchBar;
