import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Post from '../Feed/components/Post.jsx';
import Header from '../../templates/components/Header/index.js';
import { customHook } from '../../lib';
import { UserListPopup } from '../../templates/components/Popups';


import './user.css';

const Feed = (props) => {
  const {
    getUser,
    uploadAvatar,
    followUser,
    unfollowUser,
    getFollowList,
  } = props;
  const { username } = useParams();
  const history = useHistory();
  let avatarInput = null

  const [ user, setUser ] = useState({});
  const [ posts, setPosts ] = useState([]);
  const [ following, setFollowing ] = useState();
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ popup, setPopup ] = useState();
  const [ popupData, setPopupData ] = useState({});

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
      history.push('/feed');
    });
  }, [ username ]);

  // const userDataLoaded = !!Object.values(user).length && posts;
  const avatarSrc = user.avatar ? `http://localhost:5000/uploads/${user.avatar}` : 'http://localhost:5000/uploads/no-img.png';
  const postsMarkup = (
    posts.map((post) =>
      <div key={post.id} className="user-profile__posts__single">
        <img src={`http://localhost:5000/uploads/${post.fileName}`} alt="user-post" />
        <div className="user-profile__posts__single__hover">
          <div>L: {post.likeCount ? post.likeCount : 0}</div>
          <div>C: {post.commentCount ? post.commentCount : 0}</div>
        </div>
      </div>
    )
  )

  const handleAvatarIconClick = () => {
    avatarInput.click();
  }
  
  const handleFollowButtonClick = (username) => {
    if(following) {
      unfollowUser(username).then(() => {
        user.followerCount--;
        setFollowing(!following);
      });
    } else {
      followUser(username).then(() => {
        user.followerCount++
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

  const handleEditButtonClick = () => {
    history.push('/settings');
  }

  const handlePopupLinkClick = (listType) => {
    getFollowList({ listType, username }).then((res) => {
      setPopupData(res);
      setPopup(listType);
    });
  }

  if(!dataLoaded) {
    return <p>LOADING</p>
  }

  return (
    <div className="user-profile-wrapper">
      <Header />
      {
        popup 
          &&
        <UserListPopup
          type={popup}
          data={popupData}
          setPopup={setPopup}
          setPopupData={setPopupData}
        />
      }
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
          {
            !user.isOwnProfile ?
              <button onClick={() => handleFollowButtonClick(username)}>{following ? 'Following' : 'Follow'}</button>
            :
              <button onClick={handleEditButtonClick}>Edit profile</button>
          }
          <div className="user-profile__user-stats">
            <span>{posts.length} posts</span>
            <span onClick={() => handlePopupLinkClick('follower')}>{`${user.followerCount} followers`}</span>
            <span onClick={() => handlePopupLinkClick('followed')}>{`${user.followingCount} following`}</span>
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





