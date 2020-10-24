import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../Feed/components/Post.jsx';
import Header from '../../templates/components/Header/index.js';


import './user.css';

const Feed = (props) => {
  const {
    getUser,
    uploadAvatar,
  } = props;
  const { username } = useParams();
  let avatarInput = null

  const [ user, setUser ] = useState({});
  const [ posts, setPosts ] = useState([]);
  
  useEffect(() => {
    getUser({ username }).then((res) => {
      setUser(res.user);
      setPosts(res.posts);
    });
  }, [user.avatar]);

  const userDataLoaded = user && posts;
  const avatarSrc = user.avatar ? `http://localhost:5000/uploads/${user.avatar}` : 'http://localhost:5000/uploads/no-img.png';

  const postsMarkup = (
    posts.map((post) =>
      <div key={post.id} className="user-profile__posts__single">
        <img src={`http://localhost:5000/uploads/${post.fileName}`} alt="user-post"/>
      </div>
    )
  )

  const handleAvatarIconClick = () => {
    avatarInput.click();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    uploadAvatar({ formData });
  }

  return (
    <div className="user-profile-wrapper">
      <Header />
      <div className="user-profile__header">
        <div className="user-profile__avatar" onClick={handleAvatarIconClick} style={{ backgroundImage: `url(${avatarSrc})`}}>

          <div className="user-profile__avatar_hover" />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            hidden
            accept="image/png, image/jpeg"
            name="avatar-upload"
            ref={(input) => { avatarInput = input; }}
            onChange={handleSubmit}
          />
        </form>
        <div className="user-profile__header-info">
          <h3>{username}</h3>
          <div className="user-profile__user-stats">
            <span>{posts.length} posts</span>
            <span># followers</span>
            <span># following</span>
          </div>
          <div className="user-profile__bio">
            <span>Something about me</span>
          </div>
        </div>
      </div>
      <div className="user-profile__posts">
        {postsMarkup}
      </div>
      { userDataLoaded ? <p>user loaded</p> : <p>LOADING</p>}
    </div>
  )
};

// PropTypes

export default Feed;





