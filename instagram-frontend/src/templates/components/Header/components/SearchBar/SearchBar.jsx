import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './SearchBar.scss';

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
  }
  if(result.length > 0) {
    markup = (
      result.map((user, i) => {
        const avatarSrc = user.avatar ? `http://localhost:5000/uploads/${user.avatar}` : 'http://localhost:5000/uploads/no-img.png';
        return <a href={`/u/${user.username}`} className="header-search__results__single" key={i}>
          <div className="header-search__results__single__image-wrapper"><img src={avatarSrc} /></div>
          <div className="header-search__results__single__info">
            <span className="header-search__results__single__username">{user.username}</span>
            <span className="header-search__results__single__name">{user.fullName}</span>
          </div>
        </a>
      })
    )
  } else if (result.length < 1 && searchQuery !== '' && !loading) {
    markup = (
      <div className="header-search__results-empty">No users found</div>
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

  const showMarkup = showSearch && focus;

  return (
    <div className="header-search">
      <div className={`backdrop${backdropVisible ? ' show' : ''}`} onClick={handleBackdropClick}></div>
        <form className="header-search__form">
          <input
            type="text"
            placeholder="Search"
            onChange={handleInputChange}
            value={searchQuery}
            onFocus={handleFocus}
            className="header-search__form__input"
          />
          { focus && !loading ? <span onClick={handleClearInput} className="header-search__form__clear" /> : null} {/*clear input */}
          { loading && <span className="header-search__form__loading">L</span> } {/*loading indicator */}
        </form>
        <div className="header-search__results">
          {showMarkup && markup}
        </div>
    </div>
  )
}

SearchBar.propTypes = {
  search: PropTypes.func.isRequired,
}

export default SearchBar;
