import React, { useState, useEffect } from 'react';

const SearchBar = (props) => {
  const [ result, setResult ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ showSearch, setShowSearch ] = useState(false);
  const [ focus, setFocus ] = useState(false);
  const[ loading, setLoading ] = useState(false);

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
      result.map((user) => {
        return <a href="/" className="search-result-single">
          <div><img src={user.imageUrl} /></div>
          {user.username}
          {user.fullName}
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
    // setFocus(false);
    setResult([1]);
  }
  const handleBlur = (e) => {
    // setShowSearch(false);
    setFocus(false)
  }
  const handleFocus = () => {
    setFocus(true);
    setShowSearch(true);
  }
  

  const showMarkup = showSearch && focus && !loading


  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
          value={searchQuery}
          // onBlur={handleBlur}
          onFocus={handleFocus}
          />
        { focus && <span onClick={handleClearInput}>x</span>} {/*clear input */}
        { loading && <span>L</span> } {/*loading indicator */}
      </form>
      <div className="search-results-wrapper">
        {showMarkup && markup}
      </div>
    </div>
  )
}


export default SearchBar;