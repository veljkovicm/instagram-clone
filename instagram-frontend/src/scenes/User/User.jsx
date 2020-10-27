import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Post from '../Feed/components/Post.jsx';
import Header from '../../templates/components/Header/index.js';
import { customHook } from '../../lib';


import './user.css';

const Feed = (props) => {
  const {
    getUser,
    uploadAvatar,
    followUser,
    unfollowUser,
  } = props;
  const { username } = useParams();
  let avatarInput = null

  const [ user, setUser ] = useState({});
  const [ posts, setPosts ] = useState([]);
  const [ following, setFollowing ] = useState();
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const history = useHistory();
  console.log('>> user', user);
  useEffect(() => {
    getUser({ username })
    .then((res) => {
      setUser(res.user);
      setPosts(res.posts);
      setFollowing(res.user.following)
    })
    .then(() => {
      setDataLoaded(true);
    })
    .catch((err) => {
      console.log(err);
      history.push('/feed')
    });
  }, []);

  // const userDataLoaded = !!Object.values(user).length && posts;
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
  
  const handleFollowButtonClick = (username) => {
    if(user.following) {
      unfollowUser(username).then(() => {
        setFollowing(!following)
      });
    } else {
      followUser(username).then(() => {
        setFollowing(!following)
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    uploadAvatar({ formData });
  }
  
  if(!dataLoaded) {
    return <p>LOADING</p>
  }

  return (
    <div className="user-profile-wrapper">
      <Header />
      <div className="user-profile__header">
        <div
          className="user-profile__avatar"
          onClick={user.isOwnProfile ? handleAvatarIconClick : null}
          style={{ backgroundImage: `url(${avatarSrc})`}}
        >
          <div className={user.isOwnProfile ? 'user-profile__avatar_hover' : null} />
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

            { !user.isOwnProfile ? <button onClick={() => handleFollowButtonClick(username)}>{following ? 'Following' : 'Follow'}</button> : null}
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
      {/* { dataLoaded ? <p>user loaded</p> : <p>LOADING</p>} */}
    </div>
  )
};

// PropTypes

export default Feed;





